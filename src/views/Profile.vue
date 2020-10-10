<template>
<div class="profile">
  <h1 class="profile_title">My Trips</h1>
  <div class="profile_trips-container">
    <div class="profile_trip"></div>
    <Trip :trips="trips" />
  </div>
</div>
</template>

<script>
import axios from "axios";
import Trip from "../components/Trip.vue";

export default {
  name: "Profile",
  components: {
    Trip,
  },
  data() {
    return {
      user: {},
      trips: [],
    };
  },
  mounted() {
    axios.get(`/api/trip/${this.$store.state.token}`).then((response) => {
      this.trips = response.data.Trips;
    });
  },
};
</script>

<style scoped>
.profile {
  padding-bottom: 600px;
}

.profile_title {
  padding-top: 20px;
  padding-left: 40px;
  padding-bottom: 30px;
}
</style>
