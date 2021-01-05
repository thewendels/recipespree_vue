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

    <!-- Title, Source, and Recipe Operations (Edit, Delete) -->
    <section class="bg-theme-color-light p-0 rounded">
      <div class="container py-3 d-flex mb-3 justify-content-between align-items-center">
        <div>
          <h1 class="h3 mb-0">
            {{ recipe.name }}
          </h1>
          <a v-if="recipe.recipe_url && recipe.source" :href="recipe.recipe_url" target="_blank"><h5>{{ recipe.source }}</h5></a>
          <a v-else-if="!recipe.source && recipe.recipe_url" :href="recipe.recipe_url" target="_blank"><h5>Source: {{ recipe.recipe_url }}</h5></a>
          <h5 v-else-if="!recipe.recipe_url && recipe.source">Source: {{ recipe.source }}</h5>
        </div>
        <div class="d-flex">
          <router-link class="btn btn-sm rounded-circle btn-pink btn-soft-static" v-bind:to="`/recipes/${recipe.id}/edit`">
            <i class="fi fi-pencil"></i>
          </router-link>
          <button class="btn btn-sm rounded-circle btn-pink btn-soft-static" v-on:click="showRecipeDeleteModal()">
            <i class="fi fi-thrash"></i>
          </button>
        </div>
      </div>
		</section>

    <!-- Image and Tag Manager -->
    <section class="py-3">

      <!-- Container for both -->
      <div class="d-flex">

        <!-- Photo Column -->
        <div v-if="recipe.image_url" class="d-middle rounded-xl overflow-hidden col-6 px-0" style="d-flex">
          <img :src="`${recipe.image_url}`" v-bind:alt="recipe.name" />
        </div>

        <!-- Tags Column -->
        <div class="d-flex flex-column align-items-center justify-content-around col-6 px-0">
          
          <!-- Tags with trash cans -->
          <div v-if="recipe.tags.length > 0 && !tagManagerAppear">
            <div v-for="tag in recipe.tags" class="d-flex">
              <router-link class="btn btn-sm btn-outline-pink btn-pill m-1 ml-5" style="font-size:0.75rem" v-bind:to="`/tags/${tag.id}`">{{ tag.name }}</router-link>
              <button class="btn btn-sm rounded-circle btn-pink btn-soft-static" v-on:click="destroyRecipeTag(tag)">
                <i class="fi fi-thrash"></i>
              </button>
            </div>
          </div>

          <!-- Tag manager -->
          <div class="d-flex">
            
            <!-- Button to add tag -->
            <button class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-5" v-on:click="showTagManager()" v-if="tagManagerAppear !== true">Add Tag</button>
            
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
                  <button v-on:click="showTagManager()"class="btn btn-pink btn-pill" >Cancel</button>
                  <input type="submit" value="Submit" class="btn btn-pink btn-pill"/>
                </div>
              </div>
            </form>
          </div> 
        </div>
      </div>
    </section>




    
    




    <!-- Next section -->
    <p v-if="recipe.total_prep_time">Total Prep Time: {{ recipe.friendly_prep_time }}</p>
    <p v-if="recipe.intro">Intro: {{ recipe.intro }}</p>
    <p>Ingredients:</p>
    <ul v-for="ingredient in recipe.stepped_ingredients">
      <li>{{ ingredient }}</li>
    </ul>
    <p>Instructions:</p>
    <div v-for="instruction in recipe.stepped_instructions">
      <p>{{ instruction }}</p>
    </div>
    <p v-if="recipe.notes">Notes: {{ recipe.notes }}</p>
    <p>
      <router-link to="/recipes">Back to All Recipes</router-link>
    </p>
  </div>
</template>

<style>
img {
  width: 100%;
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
          this.tagManagerAppear = false;
        })
        .catch(error => {
          console.log("recipes create error", error.response);
          this.errors = error.response.data.errors;
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