<template>
  <div class="recipes-new">
    
    <!-- Title and Pick Add Method -->
    <section class="bg-theme-color-light p-0 rounded">
      <div class="container py-3 d-flex mb-3 justify-content-between align-items-center">
        <h1 class="h3 mb-0">Add a Recipe</h1>

        <!-- Radio Buttons for Manual or URL -->
        <div class="d-flex">
          <!-- Radio Button - Manual -->
          <label class="form-radio form-radio-pink form-radio-bordered">
            <input type="radio" name="manual" value ="manual" v-model="picked">
            <i></i> <span>Enter Recipe Manually</span>
          </label>
          <!-- Radio Button - URL -->
          <label class="form-radio form-radio-pink form-radio-bordered">
            <input type="radio" name="url" value ="url" v-model="picked" checked>
            <i></i> <span>Import Recipe via URL</span>
          </label>
        </div>
        
      </div>
		</section>
    
    <!-- Manual Input Form -->
    <div v-if="picked == 'manual'" class="mb-3">
      <form v-on:submit.prevent="createRecipe()">
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
        <div>
          <div class="form-label-group mb-3">
            <input type="text" v-model="newName" placeholder="Name(Required)" class="form-control">
            <label for="text">Name (Required) </label>
          </div>
          <div class="form-label-group mb-3">
            <input type="text" v-model="newSource" placeholder="Source" class="form-control">
            <label for="text">Source</label>
          </div>
          <div class="form-label-group mb-3">
            <input type="text" v-model="newRecipeUrl" placeholder="Recipe URL" class="form-control">
            <label for="text">Recipe URL</label>
          </div>
          <div class="form-label-group mb-3">
            <input type="text" v-model="newServings" placeholder="Servings" class="form-control">
            <label for="text">Servings</label>
          </div>
          <div class="form-label-group mb-3">
            <input type="number" v-model="newTotalPrepTime" placeholder="Total Prep Time (Enter number of minutes)" class="form-control">
            <label for="number">Total Prep Time (Enter number of minutes)</label>
          </div>
          <div class="form-label-group mb-3">
            <textarea v-model="newIntro" placeholder="Author's Introduction or Headnote" id="description" class="form-control" rows="3"></textarea>
            <label for="textarea">Author's Introduction or Headnote</label>
          </div>
          <div class="form-label-group mb-3">
            <textarea v-model="newIngredients" placeholder="Ingredients (Required)" id="description" class="form-control" rows="5"></textarea>
            <label for="textarea">Ingredients (Required)</label>
          </div>
          <div class="form-label-group mb-3">
            <textarea v-model="newInstructions" placeholder="Instructions (Required)" id="description" class="form-control" rows="5"></textarea>
            <label for="textarea">Instructions (Required)</label>
          </div>
          <div class="form-label-group mb-3">
            <textarea v-model="newNotes" placeholder="Notes" id="description" class="form-control" rows="3"></textarea>
            <label for="textarea">Notes</label>
          </div>
          <div class="form-label-group mb-3">
            <input type="text" v-model="newImageUrl" placeholder="Image URL (Right click on the image and select 'Copy Image Address')" class="form-control">
            <label for="text">Image URL (Right click on the image and select 'Copy Image Address')</label>
          </div>
        </div>
        <input type="submit" value="Create" />
      </form>
    </div>

    <!-- URL Input Form -->
    <div v-if="picked == 'url'" class="mb-3">
      <form v-on:submit.prevent="scrapeRecipe()">
        <div class="form-label-group mb-3">
            <input type="text" v-model="recipeUrl" placeholder="Recipe URL" class="form-control">
            <label for="text">Recipe URL</label>
          </div>
        <input type="submit" value="Import" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      newName: "",
      newSource: "",
      newRecipeUrl: "",
      newServings: "",
      newTotalPrepTime: "",
      newIntro: "",
      newIngredients: "",
      newInstructions: "",
      newNotes: "",
      newImageUrl: "",
      recipeUrl: "",
      errors: [],
      picked: "manual"
    };
  },
  created: function() {},
  methods: {
    createRecipe: function() {
      var params = {
        name: this.newName,
        source: this.newSource,
        recipe_url: this.newRecipeUrl,
        servings: this.newServings,
        total_prep_time: this.newTotalPrepTime,
        intro: this.newIntro,
        ingredients: this.newIngredients,
        instructions: this.newInstructions,
        notes: this.newNotes,
        image_url: this.newImageUrl,
      };

      axios 
        .post("/api/recipes", params)
        .then(response => {
          console.log("recipes create", response.data);
          this.$router.push("/recipes/" + response.data.id);
        })
        .catch(error => {
          console.log("recipes create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    scrapeRecipe: function() {
      var params = {
        url: this.recipeUrl,
      };

      axios 
        .post("/api/recipes/scrape", params)
        .then(response => {
          console.log("recipes scrape", response.data);
          this.$router.push("/recipes/" + response.data.id);
        })
        .catch(error => {
          console.log("recipes create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  }
}
</script>