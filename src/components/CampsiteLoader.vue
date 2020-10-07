<template>
<div class="trip-planner">
  <form id="campsite-loader" v-on:submit.prevent="processForm">
    <label for="origin">where are you coming from?</label>
    <input type="text" id="origin" class="form-control" v-model="currentTrip.origin" />

    <label for="destination">where are you going?</label>
    <input type="text" id="destination" class="form-control" v-model="currentTrip.destination" />

    <label for="dailyDriveTime">how long do you want to drive each day?</label>
    <input min="1" max="23" type="number" id="dailyDriveTime" class="form-control" v-model.number="currentTrip.dailyDriveTime" />

    <label for="tripStartDate">when are you setting out?</label>
    <input type="date" id="tripStartDate" class="form-control" v-model="currentTrip.tripStartDate" />
    <button>let's go!</button>
  </form>
</div>
</template>

<script>
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
    };
  },
  methods: {
    processForm: function () {
      console.log(this.currentTrip.origin);
    },
  },
};
</script>

<style>
</style>
