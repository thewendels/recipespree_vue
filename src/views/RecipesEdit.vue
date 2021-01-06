<template>
  <div class="recipes-edit">

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
    
    <!-- Title and Pick Add Method -->
    <section class="bg-theme-color-light p-0 rounded">
      <div class="container py-3 d-flex mb-3 justify-content-between align-items-center">
        <h1 class="h3 mb-0">Update Recipe</h1>
      </div>
		</section>

    <!-- Update Recipe Form -->
    <form v-on:submit.prevent="updateRecipe(recipe)" class="mb-3 mx-5">
      <div class="form-label-group mb-3">
        <input type="text" v-model="recipe.name" placeholder="Name(Required)" class="form-control">
        <label for="text">Name (Required) </label>
      </div>
      <div class="form-label-group mb-3">
        <input type="text" v-model="recipe.source" placeholder="Source" class="form-control">
        <label for="text">Source</label>
      </div>
      <div class="form-label-group mb-3">
        <input type="text" v-model="recipe.recipe_url" placeholder="Recipe URL" class="form-control">
        <label for="text">Recipe URL</label>
      </div>
      <div class="form-label-group mb-3">
        <input type="text" v-model="recipe.servings" placeholder="Servings" class="form-control">
        <label for="text">Servings</label>
      </div>
      <div class="form-label-group mb-3">
        <input type="number" v-model="recipe.total_prep_time" placeholder="Total Prep Time (Enter number of minutes)" class="form-control">
        <label for="number">Total Prep Time (Enter number of minutes)</label>
      </div>
      <div class="form-label-group mb-3">
        <textarea v-model="recipe.intro" placeholder="Author's Introduction or Headnote" id="description" class="form-control" rows="3"></textarea>
        <label for="textarea">Author's Introduction or Headnote</label>
      </div>
      <div class="form-label-group mb-3">
        <textarea v-model="recipe.ingredients" placeholder="Ingredients (Required)" id="description" class="form-control" rows="5"></textarea>
        <label for="textarea">Ingredients (Required)</label>
      </div>
      <div class="form-label-group mb-3">
        <textarea v-model="recipe.instructions" placeholder="Instructions (Required)" id="description" class="form-control" rows="5"></textarea>
        <label for="textarea">Instructions (Required)</label>
      </div>
      <div class="form-label-group mb-3">
        <textarea v-model="recipe.notes" placeholder="Notes" id="description" class="form-control" rows="3"></textarea>
        <label for="textarea">Notes</label>
      </div>
      <div class="form-label-group mb-3">
        <input type="text" v-model="recipe.image_url" placeholder="Image URL (Right click on the image and select 'Copy Image Address')" class="form-control">
        <label for="text">Image URL (Right click on the image and select 'Copy Image Address')</label>
      </div>
      <div class="text-center my-4">
        <router-link v-bind:to="`/recipes/${this.$route.params.id}`" class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0">Cancel</router-link>
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
      recipe: {},
      errors: [],
    };
  },
  created: function() {
    axios
      .get("/api/recipes/" + this.$route.params.id)
      .then(response => {
        console.log("recipes show", response);
        this.recipe = response.data;
      });
  },
  methods: {
    updateRecipe: function(recipe) {
      var params = {
        name: recipe.name,
        source: recipe.source,
        recipe_url: recipe.recipe_url,
        servings: recipe.servings,
        total_prep_time: recipe.total_prep_time,
        intro: recipe.intro,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        notes: recipe.notes,
        image_url: recipe.image_url,
      };
      axios
        .patch("/api/recipes/" + recipe.id, params)
        .then(response => {
          console.log("recipes update", response);
          this.$router.push("/recipes/" + this.$route.params.id);
        })
        .catch(error => {
          console.log("recipes update error", error.response);
          this.errors = error.response.data.errors;
          $('#updateErrorModal').modal('show');
        });
    },
  },
};
</script>