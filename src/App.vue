<template>
<div id="app">
  <div class="app_container">
    <h1 class="app_title">ON THE ROAD</h1>
    <div class="home_intro">
      for when you’ve got somewhere to be but nowhere to stay along the way
    </div>
    <Nav v-if="this.$route.path !== '/'" />
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import Nav from "./components/Nav.vue";
import route from "./router";

export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Changa:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

#app {
  background-color: #fffaf0;
}

.app_title {
  text-align: center;
  padding-top: 20px;
  font-family: 'Changa';
  font-size: 60px;
  color: #2b3e40;
}

.home_intro {
  text-align: center;
  font-family: 'Montserrat';
  font-size: 14px;
  opacity: 80%;
  font-style: italic;
  padding-bottom: 15px;
}
</style>
