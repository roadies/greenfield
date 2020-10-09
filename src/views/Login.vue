<template>
<div class="home">
  <h1 class="home_title">I'm the home component</h1>
  <a class="home_sign_in" href="/google">Sign in with Google</a>
  <img class="home_image" src="https://www.collinsdictionary.com/images/full/road_124163875_1000.jpg" alt="" />
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    axios.get("/user/profile").then((response) => {
      if (response.data.googleId) {
        console.log(this.$store.state);
        this.$store.state.isUserLoggedIn = true;
        this.$store.state.token = response.data.googleId;
        console.log(this.$store.state);
        this.user = response.data;
      }
    });
  },
};
</script>

<style>
</style>
