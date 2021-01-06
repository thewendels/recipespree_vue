<template>
  <div class="tags-show">

    <!-- Delete Tag Check Modal -->
    <div class="modal fade" id="deleteTagModal" tabindex="-1" role="dialog" aria-labelledby="delete tag modal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteTag">Delete Tag</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this tag?</p>
            <p>It will be removed from all recipes, but the recipes will not be destroyed.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-pink" data-dismiss="modal">Cancel</button>
            <button type="button" data-dismiss="modal" class="btn btn-pink" v-on:click="destroyTag(tag)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Title and Tag Operations (Edit, Delete, Home) -->
    <section class="bg-theme-color-light p-0 rounded" >
      <div class="container py-3 d-flex mb-3 justify-content-between align-items-center">
        <h1 class="h3 mb-0">
          {{ tag.name }}
        </h1>
        <div class="d-flex">
          <router-link class="btn btn-sm rounded-circle btn-pink btn-soft-static" data-toggle="tooltip" data-placement="bottom" title="Edit" v-bind:to="`/tags/${tag.id}/edit`">
            <i class="fi fi-pencil"></i>
          </router-link>
          <button class="btn btn-sm rounded-circle btn-pink btn-soft-static" data-toggle="tooltip" data-placement="bottom" title="Delete" v-on:click="showTagDeleteModal()">
            <i class="fi fi-thrash"></i>
          </button>
          <router-link class="btn btn-sm rounded-circle btn-pink btn-soft-static" data-toggle="tooltip" data-placement="bottom" title="Home" to="/recipes/">
            <i class="fi fi-home"></i>
          </router-link>
        </div>
      </div>
		</section>

    <!-- Cards -->
    <div class="container">
      <!-- Search Results -->
      <div class="row">
        <div class="col-12 col-lg-4 mb-4" v-for="recipe in tag.recipes">
          <router-link v-bind:to="`/recipes/${recipe.id}`">
            <div class="card b-0 shadow-primary-xs shadow-primary-md-hover transition-all-ease-250 transition-hover-top h3-100 rounded overflow-hidden h-100">
              <div class="clearfix">
                <img v-if="recipe.image_url" class="card-img" :src="`${recipe.image_url}`" v-bind:alt="recipe.name">
                <img v-else class="card-img" src="/assets/images/default-recipe-photo.png" v-bind:alt="recipe.name">
              </div>
              <div class="card-body font-weight-light">
                <h5 style="color: #212529">{{ recipe.name }}</h5>
                <p>{{ recipe.source }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="text-center my-4">
      <router-link class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0" v-bind:to="`/tags/${tag.id}/edit`">Edit Tag</router-link>
      <button class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0" v-on:click="showTagDeleteModal()">
      Delete Tag</button>
      <router-link to="/recipes" class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0">Home</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      tag: {},
      recipe: {},
      recipes: [],
    };
  },
  created: function() {
    axios
      .get("/api/tags/" + this.$route.params.id).then(response => {
        console.log("tags show", response);
        this.tag = response.data;
      });
  },
  methods: {
    showTagDeleteModal: function() {
      $('#deleteTagModal').modal('show');
    },
    destroyTag: function(tag) {
      axios.delete("/api/tags/" + tag.id).then(response => {
        console.log("tags destroy", response);
        this.$router.push("/tags");
      });
    },
  },
};
</script>