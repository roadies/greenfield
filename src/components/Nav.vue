<template>
<nav>
  <router-link class="app_link" to="/newtrip">Create a Trip</router-link>
  <router-link class="app_link" to="/profile">My Trips</router-link>
  <router-link class="app_link" to="/journal">Journal</router-link>

  <a class="home_sign_in" href="/logout">logout</a>
</nav>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style>
</style>
