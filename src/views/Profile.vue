<template>
<div class="profile">
  <h2>Hello {{ user.name }}!!</h2>

  <h1>I'm the profile</h1>

  <div class="profile_upcoming">
    <h2>Upcomming</h2>
    <div class="profile_details">
      <h4>I'm an upcoming trip</h4>
    </div>
  </div>

  <div class="profile_completed">
    <h2>Completed</h2>
    <div class="profile_details">
      <h4>I'm a completed trip</h4>
    </div>
  </div>
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
      this.user = response.data;
    });
  },
};
</script>

<style>
</style>
