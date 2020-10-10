<template>
<div class="trip">
  <div class="trip_container" v-for="(trip, i) in trips.slice().reverse()" :key="i">
    <h3>{{ trip.name }}</h3>
    <h4>{{ trip.location_start }} - {{ trip.location_end }}</h4>
    <h5>{{trip.start_date}}</h5>
    <JournalForm :trip="trip"/>
    <router-link class="app_link" :to="{ path: '/trip', query: { id: trip.id }}"><button>view trip</button></router-link>
  </div>
</div>
</template>

<script>
import JournalForm from './JournalForm.vue';
// import ViewTrip from ''
export default {
  name: "Trip",
  props: ["trips"],
  components: {JournalForm},
};
</script>

<style>
.trip {
  display: flex;
  flex-direction: column;
  padding-bottom: 600px;
  text-align: center;
}

.trip_container {
  padding-bottom: 20px;
}
</style>
