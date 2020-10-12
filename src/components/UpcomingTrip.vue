<template>
<div class="trip">
  <div class="trip_container" v-for="trip in trips
        .slice()
        .reverse()
        .filter((trip) => trip.completed === false)" :key="trip.id">
    <h4 class="trip_title" @click="changeBool(trip.id)">
      {{ trip.location_start }} - {{ trip.location_end }}
    </h4>
    <h5>{{ trip.start_date }}</h5>
    <div class="trip_button1">
      <JournalForm :trip="trip" />
    </div>
    <div class="trip_button2">
      <router-link class="app_link" :to="{ path: '/trip', query: { id: trip.id } }"><button type="button" class="btn btn-success">
          View Trip
        </button></router-link>
    </div>
    <button type="button" class="btn btn-danger" @click="deleteTrip(trip.id)">
      Delete Trip
    </button>
  </div>
</div>
</template>

<script>
import JournalForm from "./JournalForm.vue";
import axios from "axios";
import {
  createLogger
} from "vuex";
// import ViewTrip from ''
export default {
  name: "UpcomingTrip",
  props: ["trips"],
  components: {
    JournalForm,
  },
  methods: {
    changeBool(id) {
      axios
        .put(`/api/tripcompleted/${id}`)
        .then(() =>
          axios
          .get(`/api/trip/${this.$store.state.userId}`)
          .then((response) => this.$emit("update", response.data.Trips))
        );
    },
    deleteTrip(id) {
      axios
        .delete(`/api/trip/${id}`)
        .then(() =>
          axios
          .get(`/api/trip/${this.$store.state.userId}`)
          .then((response) => this.$emit("update", response.data.Trips))
        );
    },
  },
};
</script>

<style>
.trip {
  display: flex;
  flex-direction: column;
  padding-bottom: 600px;
  text-align: center;
}

.trip_title {
  cursor: pointer;
  padding-bottom: 10px;
  font-family: "Rye";
}

.trip_title:hover {
  transform: scale(1.07);
  color: blue;
}

.trip_container {
  padding-bottom: 20px;
}

.trip_button1,
.trip_button2 {
  padding: 5px;
  text-align: center;
  display: inline-block;
}
</style>
