<template>
<div class="savedTrip">
  <div class="savedTrip_info" v-if="this.tripInfo.origin">
    <h2 class="savedTrip_title">
      {{ this.tripInfo.origin.address }}
      <h3>to</h3>
      {{ this.tripInfo.destination.address }}
    </h2>
    <p class="savedTrip_description">
      <strong>trip time:</strong> {{ this.tripInfo.distance }} ||
      <strong>travel time:</strong> ~{{
          Math.ceil(this.tripInfo.duration / 3600)
        }}
      hours
    </p>
    <p class="savedTrip_description">
      <strong>Departure:</strong> {{ this.tripInfo.startDate }}
    </p>
  </div>
  <center>
    <GoogleMap :tripInfo="tripInfo" :allCampsites="allCampsites" :savedView="savedView" />
  </center>
</div>
</template>

<script>
import axios from "axios";
import GoogleMap from "../components/GoogleMap.vue";

export default {
  name: "SavedTrip",
  components: {
    GoogleMap,
  },
  data() {
    return {
      tripId: "",
      tripInfo: {},
      allCampsites: {},
      savedView: "",
    };
  },
  mounted() {
    this.tripId = this.$route.query.id;
    axios.get(`/api/savedTrip/${this.tripId}`).then((response) => {
      const {
        data
      } = response;
      this.tripInfo = {
        origin: {
          address: data.location_start,
          location: {
            lat: data.latitude_start,
            lng: data.longitude_start,
          },
        },
        destination: {
          address: data.location_end,
          location: {
            lat: data.latitude_end,
            lng: data.longitude_end,
          },
        },
        startDate: data.start_date,
        distance: data.trip_distance,
        duration: data.trip_duration,
      };
      this.allCampsites = data.Campsites;
      this.savedView = true;
    });
  },
};
</script>

<style scoped>
.savedTrip {
  display: flex;
  flex-direction: column;
  padding-bottom: 100%;
  text-align: center;
}

.savedTrip_title {
  position: relative;
  padding-top: 20px;
  text-align: center;
  padding-bottom: 20px;
  font-family: "Pattaya";
  font-weight: bold;
}
</style>
