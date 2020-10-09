<template>
  <div>
    <gmap-map v-show="showMap" ref="map"
      :center="coords"
      :zoom="zoom"
      style="width: 70%; height: 500px"
    >
    <gmap-marker :position="this.coords"></gmap-marker>
    <gmap-marker :position="this.destination"></gmap-marker>
    <gmap-marker
      v-for="(camp, index) in campCoordinates"
      :key="index"
      :position="camp.location"
      :title="camp.name"
      :clickable="true"
      :draggable="false"
      v-on:click="openInfoWindow(camp)" />
  </gmap-map>
  <gmap-info-window
    :options="{maxWidth: 300}"
    :position="infoWindow.position"
    :opened="infoWindow.open"
    @closeclick="infoWindow.open=false">
    <div v-html="infoWindow.template"></div>
</gmap-info-window>
  <button @click="getDirection">set route</button>
  <button @click="convertToCoords">convert to coords</button>
  <button @click="splitUpTrip">split up trip</button>

</div>
</template>

<script>
export default {
  props: [
    'origin',
    'final',
    'dailyDriveTime',
    'allCampsites'
  ],
  data() {
    return {
      showMap: true,
      zoom: 5,
      infoWindow: {
        position: {lat: 0, lng: 0},
        open: false,
        template: ''
      },
      coords: {
        lat: 29.9510555,
        lng: -90.07148239999999,
      },
      destination: {
        lat: 29.9510555,
        lng: -90.07148239999999
      },
      tripDuration: '',
      tripDistance: '',
      tripRoute: '',
      daysOfDriving: '',
      itinerary: [],
      campCoordinates: [],
    };
  },
  methods: {
    getDirection: function() {
      const directionsService = new google.maps.DirectionsService;
      const directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(this.$refs.map.$mapObject);
      directionsService.route( { 'origin': this.coords, 'destination': this.destination, 'travelMode': 'DRIVING'}, (res, status) => {
        if (status === 'OK') {
          this.tripDistance = res.routes[0].legs[0].distance.text;
          this.tripDuration = res.routes[0].legs[0].duration.value;
          this.tripRoute = res.routes[0].legs[0];
          directionsDisplay.setDirections(res);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
      })
    },

    convertToCoords: function() {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': this.origin }, (res, status) => {
        this.coords.lat = res[0].geometry.bounds.Ya.i;
        this.coords.lng = res[0].geometry.bounds.Sa.i;
      })
      geocoder.geocode( { 'address': this.final }, (res, status) => {
        this.destination.lat = res[0].geometry.bounds.Ya.i;
        this.destination.lng = res[0].geometry.bounds.Sa.i;
      })
    },

    splitUpTrip: function() {
      const dailyDriveInSeconds = this.dailyDriveTime*3600;
      this.daysOfDriving = Math.ceil(this.tripDuration/(dailyDriveInSeconds));
      let timeTracker = 0;
      let dayNumber = 1;
      this.tripRoute.steps.map((step, index) => {
        if (timeTracker <= dailyDriveInSeconds) {
          timeTracker += step.duration.value;
        } else {
          const end_lat = step.end_location.lat();
          const end_lng = step.end_location.lng()
          this.itinerary.push({
            dayNumber,
            timeTracker,
            end_lat,
            end_lng,
          })
          timeTracker = 0;
          dayNumber++;
        }
      })
      this.$emit("tripItinerary", this.itinerary)
    },

  createCampCoordinates: function() {
    console.log('THIS.ALLCAMPSITES', this.allCampsites);
    this.allCampsites.map(eachNight => {
      console.log('EACH NIGHT', eachNight);
      eachNight.nearbyCamping.map(campsite => {
        console.log('CAMPSITE INFO WINDOW INFO', campsite),
        this.campCoordinates.push({
          nightNumber: eachNight.night,
          location: {
            lat: parseFloat(campsite.latitude),
            lng: parseFloat(campsite.longitude),
          },
          name: campsite.name,
          facility: campsite.parent_name,
          organization: campsite.org_name,
          description: campsite.description,
        });
      });
    });
  },

  openInfoWindow: function(selected) {
    console.log('SELECTED', selected);
    this.coords = selected.location;
    this.zoom = 10;
    const contentString = `
      name: ${selected.name}
      parent: ${selected.facility}
      organization: ${selected.organization}
      description: ${selected.description}
    `
    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
    })
    infoWindow.setPosition(this.coords);
    infoWindow.open(this.$refs.map.$mapObject);
  },
},
  watch: {
    allCampsites: function() {
      if (this.allCampsites.length === this.daysOfDriving - 1) {
        this.createCampCoordinates();
      }
    },
    deep: true,
  },
};
</script>
