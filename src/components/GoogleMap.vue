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
  <button v-if="this.$store.state.tripCalculated" @click="splitUpTrip">find yr campsites</button>
</div>
</template>

<script>
export default {
  props: [
    'dailyDriveTime',
    'allCampsites',
    'tripInfo',
    'savedView'
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
      tripLength: {
        tripDuration: '',
        tripDistance: '',
      },
      tripRoute: '',
      daysOfDriving: null,
      itinerary: [],
      campCoordinates: [],
    };
  },
  methods: {
    getDirection: function() {
      this.coords = this.tripInfo.origin.location;
      this.destination = this.tripInfo.destination.location;
      const directionsService = new google.maps.DirectionsService;
      const directionsDisplay = new google.maps.DirectionsRenderer;
      directionsService.route( { 'origin': this.coords, 'destination': this.destination, 'travelMode': 'DRIVING'}, (res, status) => {
        if (status === 'OK') {
          directionsDisplay.setMap(this.$refs.map.$mapObject);
          this.tripLength.tripDistance = res.routes[0].legs[0].distance.text;
          this.tripLength.tripDuration = res.routes[0].legs[0].duration.value;
          this.tripRoute = res.routes[0].legs[0];
          directionsDisplay.setDirections(res);
          this.$emit("tripLength", this.tripLength);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
      })
    },

    splitUpTrip: function() {
      const dailyDriveInSeconds = this.dailyDriveTime*3600;
      this.daysOfDriving = Math.ceil(this.tripLength.tripDuration/(dailyDriveInSeconds));
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
    if (!this.savedView) {
      this.allCampsites.map(eachNight => {
        eachNight.nearbyCamping.map(campsite => {
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
      this.$emit("parsedCampingOptions", this.campCoordinates);
    } else {
      this.allCampsites.map(campsite => {
          this.campCoordinates.push({
            location: {
              lat: parseFloat(campsite.latitude),
              lng: parseFloat(campsite.longitude),
            },
            name: campsite.name,
            facility: campsite.facility,
            organization: campsite.organization,
            description: campsite.description,
          });
        });
    }
  },

  openInfoWindow: function(selected) {
    this.coords = selected.location;
    this.zoom = 10;
    const contentString = `
      <div class="infoWindow">
        <h5>${selected.facility}</h5>
        <h6>${selected.name}</h6>
        <p>${selected.description}</p>
      </div>
    `
    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
    })
    infoWindow.setPosition(this.coords);
    infoWindow.open(this.$refs.map.$mapObject);
  },

},
mounted() {
  if (this.allCampsites.length && !this.DaysofDriving) {
    this.createCampCoordinates();
  }
},
watch: {
    allCampsites: function() {
      if (this.allCampsites.length === this.daysOfDriving - 1) {
        this.createCampCoordinates();
      }
    },
    savedView: function() {
      if (this.savedView) {
        this.createCampCoordinates();
      }
    },
   tripInfo: function() {
     if (typeof this.tripInfo.origin.location.lat === 'number') {
       this.getDirection();
     }
   }
  },
};
</script>

<style>
  .infoWindow {
    width: 400px;
    height: 200px;
  }
</style>