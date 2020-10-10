<template>
<div id="app">
  <div class="app_container">
    <h1 class="app_title">On the Road</h1>
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
#app {
  background-color: #fffaf0;
}

.app_title {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
