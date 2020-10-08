<template>
<div>
  <h1>New Trip</h1>
  <h1 style="text-align: center">USA Map</h1>
  <GoogleMap :origin="childData.origin" :final="childData.destination" />
  <CampsiteLoader v-on:tripInput="tripLookup" v-on:/>
  <CampsiteOptions :option="childData" />
</div>
</template>

<script>
import axios from "axios";
import GoogleMap from "../components/GoogleMap.vue";
import CampsiteLoader from "../components/CampsiteLoader.vue";
import CampsiteOptions from "../components/CampsiteOptions.vue";

export default {
  name: "NewTrip",
  components: {
    GoogleMap,
    CampsiteLoader,
    CampsiteOptions,
  },
  data: function () {
    return {
      childData: [],
    };
  },
  methods: {
    updateOptions(query) {
      console.log('QUERY', query);
      this.childData = query;
    },
    tripLookup(tripInput) {
      console.log(tripInput);
      this.childData = tripInput
    }
  },
};
</script>

<style>
</style>

