<template>
<div>
  <h1>New Trip</h1>
  <h1 style="text-align: center">USA Map</h1>
  <GoogleMap :latitude="29.9511" :longitude="-90.0715" :title="'New Orleans'" />
</div>
</template>

<script>
import GoogleMap from "../components/GoogleMap.vue";

export default {
  name: "NewTrip",
  components: {
    GoogleMap,
  },
};
</script>

<style>
</style>
