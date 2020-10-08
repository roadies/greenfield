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
</div>
</template>

<script>
export default {
  // directionsService: true,
  // directionsDisplay: true,
  props: [
    'origin',
    'final',
  ],
  data() {
    return {
      showMap: true,
      coords: {
        lat: 29.9510555,
        lng: -90.07148239999999,
      },
      destination: {
        lat: 44.3948,
        lng: -68.0830
      },
      tripDuration: '',
      tripDistance: '',
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
      function calculateAndDisplayRoute(directionsService, directionsDisplay, start, destination) {
        directionsService.route({
          origin: start,
          destination: destination,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            console.log(response.routes[0].legs[0].duration.text);
            this.tripDuration = response.routes[0].legs[0].duration.text;
            this.tripDistance = response.routes[0].legs[0].distance.text;
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      calculateAndDisplayRoute(directionsService, directionsDisplay, this.coords, this.destination);
    },
    convertToCoords: function() {
        console.log('PROPS', this.props);
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': this.origin }, (res, status) => {
          this.coords.lat = res[0].geometry.bounds.Ya.i;
          this.coords.lng = res[0].geometry.bounds.Sa.i;
        })
        geocoder.geocode( { 'address': this.final }, (res, status) => {
          this.destination.lat = res[0].geometry.bounds.Ya.i;
          this.destination.lng = res[0].geometry.bounds.Sa.i;
        })
      }
  },
};
</script>

