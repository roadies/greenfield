<template>
<div class="newTrip">
  <h1 class="newTrip_title">where are u going where have u been</h1>
  <center>
    <GoogleMap :dailyDriveTime="formData.dailyDriveTime" :tripInfo="formData" :allCampsites="campingOptions" v-on:tripItinerary="setItinerary" v-on:tripLength="setLength" />
  </center>
  <SaveTrip :tripInfo="formData" :tripLength="tripLength" :campingOptions="campingOptions" />
  <CampsiteLoader :locationsToQuery="dailyDestinations" v-on:tripInput="tripLookup" v-on:nightlyOptions="displayOptions" />
  <CampsiteOptions :dailyOptionsList="campingOptions" />
</div>
</template>

<script>
import axios from "axios";
import GoogleMap from "../components/GoogleMap.vue";
import CampsiteLoader from "../components/CampsiteLoader.vue";
import SaveTrip from "../components/SaveTrip.vue";
import CampsiteOptions from "../components/CampsiteOptions.vue";

export default {
  name: "NewTrip",
  components: {
    GoogleMap,
    CampsiteLoader,
    SaveTrip,
    CampsiteOptions,
  },
  data: function () {
    return {
      formData: [],
      tripLength: {},
      dailyDestinations: {},
      campingOptions: {},
    };
  },
  methods: {
    tripLookup(tripInput) {
      this.formData = tripInput;
    },
    setLength(tripLength) {
      this.tripLength = tripLength;
    },
    setItinerary(tripItinerary) {
      this.dailyDestinations = tripItinerary;
    },
    displayOptions(nightlyOptions) {
      this.campingOptions = nightlyOptions;
    },
  },
};
</script>

<style>
.newTrip_title {
  text-align: center;
  font-family: "Pattaya";
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
