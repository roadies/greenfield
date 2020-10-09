<template>
<<<<<<< HEAD
<nav>
  <router-link class="app_link" to="/newtrip">Create a Trip</router-link>
  <router-link class="app_link" to="/profile">My Trips</router-link>
  <router-link class="app_link" to="/journal">Journal</router-link>

  <a class="home_sign_in" href="/logout">logout</a>
</nav>
=======
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href=#>Roadies</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#"><router-link class="app_link" to="/newtrip">Create a Trip</router-link></b-nav-item>
        <b-nav-item href="#"><router-link class="app_link" to="/profile">My Trips</router-link></b-nav-item>
        <b-nav-item href="#"><router-link class="app_link" to="/journal">Journal</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
>>>>>>> ad638da... (add) add navbar
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style>
</style>
