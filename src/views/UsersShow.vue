<template>
  <div>
    <div class="users-show">
      <h1>RecipeSpree Account</h1>
      <h3>Username: {{user.username}}</h3>
      <h3>Email: {{user.email}}</h3>
      <h3>Password: ********** </h3>
    </div>
    <div>
      <p>
        <router-link v-bind:to="`/users/edit`">Edit Profile</router-link>
      </p>
      <!-- <p>
        <button v-on:click="destroyUser(user)">Delete Account</button>
      </p> -->
      <p>
        <router-link to="/recipes">Home</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
    };
  },
  created: function() {
    axios
      .get("/api/users")
      .then(response => {
        console.log("users show", response);
        this.user = response.data;
      });
  },
  methods: {},
};
</script>