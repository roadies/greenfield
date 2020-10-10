<template>
  <div class="save-button">
    <button @click.prevent="onSave">save to my trips</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: [
    'tripInfo',
    'tripLength',
    'campingOptions',
  ],
  data() {
    return {
      trip: {}
    }
  },
  methods: {
    onSave() {
      this.trip = {
        origin: this.tripInfo.origin.address,
        destination: this.tripInfo.destination.address,
        originCoords: {
          lat: this.tripInfo.origin.location.lat,
          lng: this.tripInfo.origin.location.lng,
        },
        destinationCoords: {
          lat: this.tripInfo.destination.location.lat,
          lng: this.tripInfo.destination.location.lng,
        },
        tripDuration: this.tripDuration,
        campingOptions: this.campingOptions
      }
      console.log('hey!', this.trip);
      axios.post('/api/trips', this.trip)
        .catch(err => console.error(err));
    }
  }
}
</script>

<style>

</style>