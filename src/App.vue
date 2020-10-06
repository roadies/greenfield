<template>
<div id="app">
  <h1 class="app_title">On The Road Again</h1>
  <Nav />
  <router-view></router-view>
</div>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>

<style>
</style>
