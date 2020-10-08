<template>
<div class="trip-planner">
  <form id="campsite-loader" v-on:submit.prevent="processForm" v-on:keyup.enter="processForm">
    <label for="origin">where are you coming from?</label>
    <input type="text" id="origin" class="form-control" v-model="currentTrip.origin" />

    <label for="destination">where are you going?</label>
    <input type="text" id="destination" class="form-control" v-model="currentTrip.destination" />

    <label for="dailyDriveTime">how long do you want to drive each day?</label>
    <input min="1" max="23" type="number" id="dailyDriveTime" class="form-control" v-model.number="currentTrip.dailyDriveTime" />

    <label for="tripStartDate">when are you setting out?</label>
    <input type="date" id="tripStartDate" class="form-control" v-model="currentTrip.tripStartDate" />
    <button>let's go!</button>
    <!-- <router-link class="app-link" to="/newtrip"><button>let's go!</button></router-link> -->
  </form>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "CampsiteLoader",
  data() {
    return {
      currentTrip: {
        origin: "", // convert to latitude, longitude
        destination: "", // convert to latitude, longitude
        dailyDriveTime: "",
        tripStartDate: "",
      },
      options: [],
    };
  },
  methods: {
    processForm: function () {
      const getFedCampsites = axios.get(
        `https://www.recreation.gov/api/search?q=${this.currentTrip.origin}&exact=false&fq=campsite_type_of_use%3AOvernight&fq=entity_type%3Acampground&start=0`
      );
      // const getStateCampesites = axios.get(`http://api.amp.active.com/camping/campgrounds/?pstate=${this.currentTrip.origin}&api_key=w937ncw96sqns8jbn6x2ckh2`);
      axios.all([getFedCampsites]).then(
        axios.spread((...res) => {
          this.options = res[0].data.results;
          this.$emit("query", this.options);
          // this.options = '',
        })
      );
    },
  },
};
</script>

<style>
</style>
