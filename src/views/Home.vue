<template>
<div class="home">
  <a type="button" class="btn btn-warning" href="/google">Sign in with Google</a>
  <img class="home_image" src="https://www.smartertravel.com/uploads/2017/06/road_trip_tips_hero-1400x500.jpg" alt="" />
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
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");

.home {
  display: flex;
  flex-direction: column;
  padding-bottom: 100%;
}

.btn btn-warning {
  padding-left: 100px;
  color: white;
}

a:hover {
  transform: scale(1.1);
}

.home_sign-in {
  object-position: relative;
  text-align: right;
  padding-top: 20px;
  padding-right: 250px;
  padding-bottom: 20px;
}

.home_image {
  object-fit: contain;
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  width: 80%;
  height: 10%;
}

.home_intro {
  text-align: center;
  padding-top: 30px;
}

h6 {
  font-family: "Montserrat";
  font-style: italic;
}
</style>
