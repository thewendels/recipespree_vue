<template>
  <div class="users-edit">
    <h1>Edit Profile</h1>
    <form v-on:submit.prevent="updateUser(user)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <p>
        Username: <input type="text" v-model="user.username" />
      </p>
      <p>
        Email: <input type="text" v-model="user.email" />
      </p>
      <p>
        Password: <input type="password" v-model="user.password" />
      </p>
      <p>
        Confirm Password: <input type="password" v-model="user.password_confirmation" />
      </p>
      <div>
        <router-link to="/users">Back to Profile</router-link>
        <input type="submit" value="Update" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      errors: [],
    };
  },
  created: function() {
    axios
      .get("/api/users/")
      .then(response => {
        console.log("users show", response);
        this.user = response.data;
      });
  },
  methods: {
    updateUser: function(user) {
      var params = {
        username: user.username,
        email: user.email,
        password: user.password,
        password_confirmation: user.password_confirmation,
      };
      axios
        .patch("/api/users/", params)
        .then(response => {
          console.log("users update", response);
          this.$router.push("/users");
        })
        .catch(error => {
          console.log("users update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>