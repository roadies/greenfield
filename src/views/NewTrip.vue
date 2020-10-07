<template>
<div>
  <h1>New Trip</h1>
  <h1 style="text-align: center">USA Map</h1>
  <GoogleMap :latitude="29.9511" :longitude="-90.0715" :title="'New Orleans'" />
  <CampsiteLoader v-on:query="updateOptions" />
  <CampsiteOptions :option="childData" />
</div>
</template>

<script>
import axios from 'axios';
import GoogleMap from "../components/GoogleMap.vue";
import CampsiteLoader from "../components/CampsiteLoader.vue";
import CampsiteOptions from "../components/CampsiteOptions.vue";

export default {
  name: "NewTrip",
  components: {
    GoogleMap,
    CampsiteLoader,
    CampsiteOptions
  },
  data: function() {
    return {
      childData: []
    }
  },
  methods: {
    updateOptions(query) {
      this.childData = query;
    }
  }
};
</script>

<style>
</style>
