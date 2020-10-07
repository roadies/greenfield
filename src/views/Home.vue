<template>
<div class="home">
  <h1 class="home_title">I'm the home component</h1>
  <a class="home_sign_in" href="/google">Sign in with Google</a>
  <img class="home_image" src="https://www.collinsdictionary.com/images/full/road_124163875_1000.jpg" alt="" />
  <CampsiteLoader v-on:campsites="loadSites"/>
</div>
</template>

<script>
import CampsiteLoader from "../components/CampsiteLoader.vue";

export default {
  name: "Home",
  components: {
    CampsiteLoader,
  },
};
</script>

<style scoped>
</style>
