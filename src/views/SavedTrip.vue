<template>
  <div>
    <!-- <p>{{this.tripInfo.origin.address}} to {{this.tripInfo.destination.address}}</p> -->
    <p>{{this.tripInfo.startDate}}</p>
    <p>{{this.tripInfo.distance}} // roughly {{Math.ceil(this.tripInfo.duration/3600)}} hours</p>
    <GoogleMap
      :tripInfo="tripInfo"
    />

  </div>
</template>

<script>
import axios from 'axios';
import GoogleMap from "../components/GoogleMap.vue"

export default {
  name: "SavedTrip",
  components: {
    GoogleMap,
  },
  data () {
    return {
      tripId: '',
      tripInfo: {}
    }
  },
  mounted() {
    this.tripId = this.$route.query.id;
    axios.get(`/api/savedTrip/${this.tripId}`)
      .then((response) => {
        this.tripInfo = {
          origin: {
            address: response.data.location_start,
            location: {
              lat: response.data.latitude_start,
              lng: response.data.longitude_start,
            }
          },
          destination: {
            address: response.data.location_end,
            location: {
              lat: response.data.latitude_end,
              lng: response.data.longitude_end,
            }
          },
          startDate: response.data.start_date,
          distance: response.data.trip_distance,
          duration: response.data.trip_duration,
        }
      });

  }
}
</script>

<style></style>