SAVETRIP.VUE

<template>
<div class="save-button">
  <button @click.prevent="onSave">save to my trips</button>
</div>
</template>

<script>
import axios from "axios";
export default {
  props: ["tripInfo", "tripLength", "campingOptions"],
  data() {
    return {
      trip: {
        tripData: {},
        campingData: {},
      }
    }
  },
  methods: {
    onSave() {
      this.trip.tripData = {
        userId: this.$store.state.userId,
        location_start: this.tripInfo.origin.address,
        location_end: this.tripInfo.destination.address,
        latitude_start: this.tripInfo.origin.location.lat,
        longitude_start: this.tripInfo.origin.location.lng,
        latitude_end: this.tripInfo.destination.location.lat,
        longitude_end: this.tripInfo.destination.location.lng,
        trip_duration: this.tripLength.tripDuration,
        trip_distance: this.tripLength.tripDistance,
        start_date: this.tripInfo.tripStartDate,
      }
      this.trip.campingData = this.campingOptions;
      axios.post('/api/trips', this.trip)
        .catch(err => console.error(err));
    }
  }
}
</script>

<style>
</style>

