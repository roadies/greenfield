<template>
  <div>
    <gmap-map v-show="showMap" ref="map"
      :center="coords"
      :zoom="5"
      style="width: 70%; height: 500px"
    >
    <gmap-marker :position="this.coords"></gmap-marker>
    <gmap-marker :position="this.destination"></gmap-marker>
      <!-- <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :title="m.title" :clickable="true" :draggable="false" @click="center = m.position"></gmap-marker> -->
  </gmap-map>
  <button @click="getDirection">set route</button>
  <button @click="convertToCoords">convert to coords</button>
  {{ tripDuration }} {{ tripDistance }}
  <button @click="splitUpTrip">split up trip</button>

</div>
</template>

<script>
export default {
  // directionsService: true,
  // directionsDisplay: true,
  props: [
    'origin',
    'final',
    'dailyDriveTime'
  ],
  data() {
    return {
      showMap: true,
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
      itinerary: [],
      // markers: [{
      //   position: {
      //     lat: this.latitude,
      //     lng: this.longitude,
      //   },
      //   title: this.title,
      // }, ],
    };
  },
  methods: {
    getDirection: function() {
      const directionsService = new google.maps.DirectionsService;
      const directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(this.$refs.map.$mapObject);
      directionsService.route( { 'origin': this.coords, 'destination': this.destination, 'travelMode': 'DRIVING'}, (res, status) => {
        if (status === 'OK') {
          console.log('RES', res);
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
      const daysOfDriving = Math.ceil(this.tripDuration/(dailyDriveInSeconds));
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
    }
  },
};
</script>
