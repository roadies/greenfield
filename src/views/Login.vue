<template>
<div class="login">
  <h4 class="login_welcome">Welcome {{ this.$store.state.userName }}</h4>
  <img class="login_image" src="https://media.cntraveler.com/photos/5edfc029b16364ea435ca862/3:1/w_3000,h_1000,c_limit/Roadtrip-2020-GettyImages-1151192650.jpg" alt="" />
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
        console.log(this.$store.state);
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

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  padding-bottom: 600px;
}

.login_welcome {
  text-align: center;
  padding-top: 20px;
}

.login_image {
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  width: 80%;
  height: 10%;
}
</style>
