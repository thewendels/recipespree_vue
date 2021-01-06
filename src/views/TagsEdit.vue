<template>
  <div class="tags-edit">

    <!-- RecipeTags Create Error Modal -->
    <div class="modal fade" id="tagsErrorModal" tabindex="-1" role="dialog" aria-labelledby="tags update error modal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="tagsError">Error</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Please enter a name for your tag.</p>
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
        <h1 class="h3 mb-0">Edit Tag</h1>
      </div>
		</section>

    <!-- Form -->
<!-- Update Recipe Form -->
    <form v-on:submit.prevent="updateTag(tag)" class="mb-3 mx-5">
      <div class="form-label-group mb-3">
        <input type="text" v-model="tag.name" placeholder="Name (Required)" class="form-control">
        <label for="text">Name (Required) </label>
      </div>
      <div class="text-center my-4">
        <router-link v-bind:to="`/tags/${this.$route.params.id}`" class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0">Cancel</router-link>
        <input type="submit" value="Update" class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0" />
      </div>
    </form>





    
    <!-- <form v-on:submit.prevent="updateTag(tag)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Name: <input type="text" v-model="tag.name" />
      <div>
        <router-link v-bind:to="`/tags/${this.$route.params.id}`">Cancel</router-link>
        <input type="submit" value="Update" />
      </div>
    </form> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      tag: {},
      errors: [],
    };
  },
  created: function() {
    axios
      .get("/api/tags/" + this.$route.params.id)
      .then(response => {
        console.log("tags show", response);
        this.tag = response.data;
      });
  },
  methods: {
    updateTag: function(tag) {
      var params = {
        name: tag.name,
      };
      axios
        .patch("/api/tags/" + tag.id, params)
        .then(response => {
          console.log("tags update", response);
          this.$router.push("/tags/" + tag.id);
        })
        .catch(error => {
          console.log("tags update error", error.response);
          this.errors = error.response.data.errors;
          $('#tagsErrorModal').modal('show');
        });
    },
  },
};
</script>