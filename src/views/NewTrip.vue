<template>
<div>
  <h1>New Trip</h1>
  <h1 style="text-align: center">USA Map</h1>
  <GoogleMap :origin="formData.origin" :final="formData.destination" :dailyDriveTime="formData.dailyDriveTime" v-on:tripItinerary="setItinerary" />
  <CampsiteLoader v-on:tripInput="tripLookup" :locationsToQuery="dailyDestinations" v-on:nightlyOptions="displayOptions" />
  <CampsiteOptions :dailyOptionsList="campingOptions" />
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

