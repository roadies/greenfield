<template>
<div class="newTrip">
  <h2 class="newTrip_title">Where Are We Going ?</h2>
  <CampsiteLoader :locationsToQuery="dailyDestinations" v-on:tripInput="tripLookup" v-on:nightlyOptions="displayOptions" />
  <center>
    <GoogleMap :dailyDriveTime="formData.dailyDriveTime" :tripInfo="formData" :allCampsites="campingOptions" v-on:tripItinerary="setItinerary" v-on:tripLength="setLength" v-on:parsedCampingOptions="setParsedOptions" />
  </center>
  <SaveTrip :tripInfo="formData" :tripLength="tripLength" :campingOptions="parsedCampingOptions" />
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
      parsedCampingOptions: {},
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
    setParsedOptions(parsedOptions) {
      this.parsedCampingOptions = parsedOptions;
    },
  },
};
</script>

<style>
.newTrip {
  padding-bottom: 100%;
}

.newTrip_i {
  color: red;
}

.newTrip_title {
  text-align: center;
  font-family: "Pattaya";
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
