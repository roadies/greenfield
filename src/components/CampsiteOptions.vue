<template>
  <div>
    <div v-for="(nearbyCampsites, index) in options" :key="index">
      <div v-for="(campsite, index) in nearbyCampsites.nearbyCamping" :key="index">
        <ul>
          <li>name: {{ campsite.name }}</li>
          <li>coordinates: {{ campsite.latitude }}, {{ campsite.longitude }}</li>
          <li>location: {{ campsite.city }}, {{ campsite.state_code }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CampsiteOptions",
  props: ['dailyOptionsList'],
  data: function() {
    return {
      options: []
    };
  },
  watch: {
    dailyOptionsList: function() {
      this.options = this.dailyOptionsList;
    }
  }
};
</script>

<style scoped>

</style>