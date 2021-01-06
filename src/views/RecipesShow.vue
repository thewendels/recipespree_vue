/* eslint-disable vue/no-dupe-v-else-if */
<template>
  <div class="recipes-show">

    <!-- Delete Recipe Check Modal -->
    <div class="modal fade" id="deleteRecipeModal" tabindex="-1" role="dialog" aria-labelledby="manual error modal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteRecipe">Delete Recipe</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this recipe?</p>
            <p>This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-pink" data-dismiss="modal">Cancel</button>
            <button type="button" data-dismiss="modal" class="btn btn-pink" v-on:click="destroyRecipe(recipe)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- RecipeTags Create Error Modal -->
    <div class="modal fade" id="recTagsErrorModal" tabindex="-1" role="dialog" aria-labelledby="recipe tags create error modal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="recTagsError">Error</h5>
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

    <!-- Title, Source, and Recipe Operations (Edit, Delete, Back) -->
    <section class="bg-theme-color-light p-0 rounded">
      <div class="container py-3 d-flex mb-3 justify-content-between align-items-center">
        <div>
          <h1 class="h3 mb-2">
            {{ recipe.name }}
          </h1>
          <a v-if="recipe.recipe_url && recipe.source" :href="recipe.recipe_url" target="_blank"><h5>{{ recipe.source }}</h5></a>
          <a v-else-if="!recipe.source && recipe.recipe_url" :href="recipe.recipe_url" target="_blank"><h5>Source: {{ recipe.recipe_url }}</h5></a>
          <h5 v-else-if="!recipe.recipe_url && recipe.source">Source: {{ recipe.source }}</h5>
        </div>
        <div class="d-flex">
          <router-link class="btn btn-sm rounded-circle btn-pink btn-soft-static" data-toggle="tooltip" data-placement="bottom" title="Edit" v-bind:to="`/recipes/${recipe.id}/edit`">
            <i class="fi fi-pencil"></i>
          </router-link>
          <button class="btn btn-sm rounded-circle btn-pink btn-soft-static" data-toggle="tooltip" data-placement="bottom" title="Delete" v-on:click="showRecipeDeleteModal()">
            <i class="fi fi-thrash"></i>
          </button>
          <router-link class="btn btn-sm rounded-circle btn-pink btn-soft-static" data-toggle="tooltip" data-placement="bottom" title="Go Back" to="/recipes/">
            <i class="fi fi-go-back"></i>
          </router-link>
        </div>
      </div>
		</section>

    <!-- Image and Tag Manager -->
    <section class="py-3">

      <!-- Container for both -->
      <div class="d-flex">

        <!-- Photo Column -->
        <div class="d-middle rounded-xl overflow-hidden col-8 px-0 ml-3 mb-3" style="d-flex">
          <img v-if="recipe.image_url" :src="`${recipe.image_url}`" v-bind:alt="recipe.name" class="show-img"/>
          <img v-else src="/assets/images/default-recipe-photo.png" v-bind:alt="recipe.name" class="show-img"/>
        </div>

        <!-- Tags Column -->
        <div class="d-flex flex-column align-items-start justify-content-center col-4 px-0">
          
          <!-- Tags with trash cans -->
          <div v-if="recipe.tags.length > 0 && !tagManagerAppear">
            <div v-for="tag in recipe.tags" class="d-flex">
              <router-link class="btn btn-sm btn-outline-pink btn-pill m-1 ml-3" v-bind:to="`/tags/${tag.id}`">{{ tag.name }}</router-link>
              <button class="btn btn-sm rounded-circle btn-pink btn-soft-static" data-toggle="tooltip" data-placement="bottom" title="Delete" v-on:click="destroyRecipeTag(tag)">
                <i class="fi fi-thrash"></i>
              </button>
            </div>
          </div>

          <!-- Tag manager -->
          <div class="d-flex">
            
            <!-- Button to add tag -->
            <button class="btn btn-sm btn-outline-pink btn-pill m-1 ml-3" v-on:click="showTagManager()" v-if="tagManagerAppear !== true">Add Tag</button>
            
            <!-- Form with dropdown -->
            <form v-if="tagManagerAppear" v-on:submit.prevent="createRecipeTag()" class="ml-5">
              <div>
                <select v-model.lazy="dropdownSelection" class="px-2 rounded mb-2">
                  <option disabled value="">Select a Tag </option>
                  <option value="userInputNew">Create a New Tag</option>
                  <option :value="`${tag.name}`" v-for="tag in tags">{{ tag.name }}</option>
                </select>

                <!-- Field for entering new tag name -->
                <div v-if="dropdownSelection === 'userInputNew'" class="form-label-group mb-3">
                  <input type="text" v-model="tagInput" placeholder="Tag Name" class="form-control">
                  <label for="text">Tag Name </label>
                </div>
                <div>
                  <button v-on:click="showTagManager() "class="btn btn-pink btn-pill" >Cancel</button>
                  <input type="submit" value="Submit" class="btn btn-pink btn-pill"/>
                </div>
              </div>
            </form>
          </div> 
        </div>
      </div>
    </section>

    <!-- Recipe Body -->
    <div class="mb-3 mx-5">
      <div>
        <p v-if="recipe.total_prep_time" class="mb-0 dark-text">Total Time: {{ recipe.friendly_prep_time }}</p>
        <p v-if="recipe.servings" class="dark-text">Servings: {{ recipe.servings }}</p>
      </div>
      <p v-if="recipe.intro" class="dark-text mt-5"><i>{{ recipe.intro }}</i></p>
      <h5 class="mt-5 mb-3">Ingredients</h5>
      <ul v-for="ingredient in recipe.stepped_ingredients" class="list-unstyled mb-3">
        <li>{{ ingredient }}</li>
      </ul>
      <h5 class="mt-5 mb-3">Instructions</h5>
      <div v-for="instruction in recipe.stepped_instructions">
        <p class="dark-text">{{ instruction }}</p>
      </div>
      <div v-if="recipe.notes" class="dark-text">
        <h5 class="mt-5 mb-3">Notes</h5>
        <p>{{ recipe.notes }}</p>
      </div>
      <!-- Buttons -->
      <div class="text-center my-4">
        <router-link class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0" v-bind:to="`/recipes/${recipe.id}/edit`">Edit Recipe</router-link>
        <button class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0" v-on:click="showRecipeDeleteModal()">
        Delete Recipe</button>
        <router-link to="/recipes" class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0">Back to All Recipes</router-link>
      </div>
    </div>

  </div>
</template>

<style>
.show-img {
  width: 100%;
  height: 35vw;
  object-fit: cover;
}
.dark-text {
  color: #212529;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      recipe: {},
      tag: {},
      tags: [],
      tagManagerAppear: false,
      dropdownSelection: "",
      tagInput: "",
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
    axios
      .get("/api/tags/")
      .then(response => {
        console.log("tags show", response);
        this.tags = response.data;
      });
  },
  methods: {
    showRecipeDeleteModal: function() {
      $('#deleteRecipeModal').modal('show');
    },
    showTagManager: function() {
      this.tagManagerAppear = !(this.tagManagerAppear);
      this.dropdownSelection = "";
    },
    createRecipeTag: function() {
      let tag;
      if (this.dropdownSelection === "userInputNew") {
        tag = this.tagInput;
      } else {
        tag = this.dropdownSelection;
      }
      var params = {
        tag_name: tag,
        recipe_id: this.recipe.id,
      };
      axios 
        .post("/api/recipe_tags", params)
        .then(response => {
          console.log("recipetags create", response.data);
          this.recipe = response.data;
          this.dropdownSelection = "";
          this.tagInput = "";
          this.tagManagerAppear = false;
        })
        .catch(error => {
          console.log("recipetags create error", error.response);
          $('#recTagsErrorModal').modal('show');
        });
    },
    destroyRecipeTag: function(tag) {
      var params = {
        recipe_id: this.recipe.id,
        tag_id: tag.id
      }
      axios
        .delete("/api/recipe_tags/", { data: params })
        .then(response => {
          console.log("recipetags destroy",response.data);
          this.recipe = response.data;
        })
    },
    destroyRecipe: function(recipe) {
      axios
        .delete("/api/recipes/" + recipe.id)
        .then(response => {
          console.log("recipes destroy", response);
          this.$router.push("/recipes");
        });
    }
  },
};
</script>