<template>
  <div class="users-edit">

    <!-- Update Error Modal -->
    <div class="modal fade" id="updateErrorModal" tabindex="-1" role="dialog" aria-labelledby="update error modal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateError">Error</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p style="color: #212529">Something went wrong!</p>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-pink" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Title -->
    <section class="bg-theme-color-light p-0 rounded">
      <div class="container py-3 d-flex mb-3 justify-content-between align-items-center">
        <h1 class="h3 mb-0">Update Account</h1>
      </div>
		</section>

    <!-- Update Recipe Form -->
    <form v-on:submit.prevent="updateUser(user)" class="mb-3 mx-5">
      <div class="form-label-group mb-3">
        <input type="text" v-model="user.username" placeholder="Username" class="form-control">
        <label for="text">Username </label>
      </div>
      <div class="form-label-group mb-3">
        <input type="text" v-model="user.email" placeholder="Email" class="form-control">
        <label for="text">Email</label>
      </div>
      <div class="form-label-group mb-3">
        <input type="password" v-model="user.password" placeholder="Password" class="form-control">
        <label for="text">Password</label>
      </div>
      <div class="form-label-group mb-3">
        <input type="password" v-model="user.password_confirmation" placeholder="Password Confirmation" class="form-control">
        <label for="text">Password Confirmation</label>
      </div>
      <div class="text-center my-4">
        <router-link to="/users" class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0">Cancel</router-link>
        <input type="submit" value="Update" class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0" />
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
          $('#updateErrorModal').modal('show');
        });
    },
  },
};
</script>