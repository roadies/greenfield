<template>
  <div class="saved-trip">
    <div class="trip-info" v-if="this.tripInfo.origin">
      <h3>{{this.tripInfo.origin.address}} to {{this.tripInfo.destination.address}}</h3>
      <p>trip time: {{this.tripInfo.distance}} || travel time: ~{{Math.ceil(this.tripInfo.duration/3600)}} hours</p>
      <p>head out on {{this.tripInfo.startDate}}</p>
    </div>
    <GoogleMap
      :tripInfo="tripInfo"
      :allCampsites="allCampsites"
      :savedView="savedView"
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
      tripInfo: {},
      allCampsites: {},
      savedView: '',
    }
  },
  mounted() {
    this.tripId = this.$route.query.id;
    axios.get(`/api/savedTrip/${this.tripId}`)
      .then((response) => {
        const { data } = response;
        this.tripInfo = {
          origin: {
            address: data.location_start,
            location: {
              lat: data.latitude_start,
              lng: data.longitude_start,
            }
          },
          destination: {
            address: data.location_end,
            location: {
              lat: data.latitude_end,
              lng: data.longitude_end,
            }
          },
          startDate: data.start_date,
          distance: data.trip_distance,
          duration: data.trip_duration,
        }
        this.allCampsites = data.Campsites;
        this.savedView = true;
      });

  }
}
</script>

<style>
  .saved-trip {
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
    text-align: center;
  }
</style>
