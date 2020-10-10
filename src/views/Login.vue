<template>
<div class="home">
  <h1 class="home_title">Welcome {{ this.$store.state.userName }}</h1>
  <img class="home_image" src="https://www.collinsdictionary.com/images/full/road_124163875_1000.jpg" alt="" />
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    axios.get("/user/profile").then((response) => {
      if (response.data.googleId) {
        this.$store.state.userId = response.data.id;
        this.$store.state.isUserLoggedIn = true;
        this.$store.state.token = response.data.googleId;
        this.$store.state.userName = response.data.name;
        this.user = response.data;
      }
    });
  },
};
</script>

<style>
</style>
