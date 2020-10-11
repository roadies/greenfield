<template>
<div class="profile">
  <div class="profile_trips-container">
    <div class="profile_trip"></div>
    <h2 class="profile_upcoming">Upcoming Trips</h2>
    <UpcomingTrip :trips="trips" @update="update" />
    <h2 class="profile_completed">Completed Trips</h2>
    <CompletedTrip :trips="trips" @updateCompleted="updateCompleted" />
  </div>
</div>
</template>

<script>
import axios from "axios";
import UpcomingTrip from "../components/UpcomingTrip.vue";
import CompletedTrip from "../components/CompletedTrip.vue";

export default {
  name: "Profile",
  components: {
    UpcomingTrip,
    CompletedTrip,
  },
  data() {
    return {
      user: {},
      trips: [],
    };
  },
  mounted() {
    axios.get(`/api/trip/${this.$store.state.userId}`).then((response) => {
      this.trips = response.data.Trips;
    });
  },
  methods: {
    update(newData) {
      this.trips = newData;
    },
    updateCompleted(complete) {
      this.trips = complete;
    },
  },
};
</script>

<style scoped>
.profile {
  padding-bottom: 400px;
}

.profile_title {
  padding-top: 20px;
  padding-left: 40px;
  padding-bottom: 30px;
}

.profile_upcoming,
.profile_completed {
  position: relative;
  padding-top: 30px;
  text-align: center;
  padding-bottom: 20px;
  font-family: "Pattaya";
  font-weight: bold;
}
</style>
