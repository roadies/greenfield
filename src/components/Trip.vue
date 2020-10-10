<template>
<div class="trip">
  <div class="trip_container" v-for="(trip, i) in trips.slice().reverse()" :key="i">
    <h3>{{ trip.name }}</h3>
    <h4>{{ trip.location_start }} - {{ trip.location_end }}</h4>
  </div>
</div>
</template>

<script>
export default {
  name: "Trip",
  props: ["trips"],
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
