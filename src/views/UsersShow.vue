<template>
  <div class="users-show">
    
    <!-- Delete User Check Modal -->
    <div class="modal fade" id="deleteUserModal" tabindex="-1" role="dialog" aria-labelledby="delete user modal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteAccount">Delete Account</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete your RecipeSpree account?</p>
            <p>This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-pink" data-dismiss="modal">Cancel</button>
            <button type="button" data-dismiss="modal" class="btn btn-pink" v-on:click="destroyUser(user)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Title and User Operations (Edit, Delete, Back) -->
    <section class="bg-theme-color-light p-0 rounded">
      <!-- Title -->
      <div class="container py-3 d-flex mb-3 justify-content-between align-items-center">
        <div>
          <h1 class="h3 mb-2">
            RecipeSpree Account
          </h1>
        </div>
        <!-- Light pink icon buttons -->
        <div class="d-flex">
          <router-link class="btn btn-sm rounded-circle btn-pink btn-soft-static" data-toggle="tooltip" data-placement="bottom" title="Edit" v-bind:to="`/users/edit`">
            <i class="fi fi-pencil"></i>
          </router-link>
          <button class="btn btn-sm rounded-circle btn-pink btn-soft-static" data-toggle="tooltip" data-placement="bottom" title="Delete" v-on:click="showUserDeleteModal()">
            <i class="fi fi-thrash"></i>
          </button>
          <router-link class="btn btn-sm rounded-circle btn-pink btn-soft-static" data-toggle="tooltip" data-placement="bottom" title="Go Back" to="/recipes/">
            <i class="fi fi-go-back"></i>
          </router-link>
        </div>
      </div>
		</section>

    <!-- Account Page Body -->
    <div class="my-3 mx-5">
      <h5 class="mt-3 mb-3">Username</h5>
      <p class="mb-3 dark-text">{{ user.username }}</p>
      <h5 class="mt-5 mb-3">Email</h5>
      <p class="mb-3 dark-text">{{ user.email }}</p>
      <h5 class="mt-5 mb-3">Password</h5>
      <p class="mb-5 dark-text">**********</p>
    
      <!-- Buttons -->
      <div class="text-center my-4">
        <router-link class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0" v-bind:to="`/users/edit`">Edit Account</router-link>
        <button class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0" v-on:click="showUserDeleteModal()">
        Delete Account</button>
        <router-link to="/recipes" class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0">Back to All Recipes</router-link> 
      </div>
    </div>
    
  </div>
</template>

<style>
.dark-text {
  color: #212529;
}
</style>

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
  methods: {
    showUserDeleteModal: function() {
      $('#deleteUserModal').modal('show');
    },
    destroyUser: function(user) {
      axios
        .delete("/api/users/")
        .then(response => {
          console.log("users destroy", response);
          localStorage.removeItem("jwt");
          this.$router.push("/signup");
        });
    },
  },
};
</script>