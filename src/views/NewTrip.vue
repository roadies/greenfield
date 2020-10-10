<template>
<div>
  <h1 style="text-align: center">where are u going where have u been</h1>
  <center><GoogleMap
    :dailyDriveTime="formData.dailyDriveTime"
    :tripInfo="formData"
    :allCampsites="campingOptions"
    v-on:tripItinerary="setItinerary"
    v-on:tripDuration="setDuration" /></center>
  <CampsiteLoader
    :locationsToQuery="dailyDestinations"
    v-on:tripInput="tripLookup"
    v-on:nightlyOptions="displayOptions" />
  <CampsiteOptions
    :dailyOptionsList="campingOptions" />
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
      formData: [],
      tripDuration: '',
      dailyDestinations: {},
      campingOptions: {},
    };
  },
  methods: {
    tripLookup(tripInput) {
      this.formData = tripInput;
    },
    setItinerary(tripItinerary) {
      this.dailyDestinations = tripItinerary;
    },
    displayOptions(nightlyOptions) {
      this.campingOptions = nightlyOptions;
    }
  },
};
</script>

<style>
</style>

