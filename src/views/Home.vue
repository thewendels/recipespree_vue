<template>
  <div class="home">
    <h1>Recipes</h1>

    <h2>Add a Recipe</h2>
    <div>
      <div>
        Name: 
        <input type="text" v-model="newName">
      </div>
      <div>
        Source: 
        <input type="text" v-model="newSource">
      </div>
      <div>
        Recipe URL: 
        <input type="text" v-model="newRecipeUrl">
      </div>
      <div>
        Servings: 
        <input type="text" v-model="newServings">
      </div>
      <div>
        Total Prep Time: 
        <input type="text" v-model="newTotalPrepTime">
      </div>
      <div>
        Intro: 
        <input type="text" v-model="newIntro">
      </div>
      <div>
        Ingredients: 
        <input type="text" v-model="newIngredients">
      </div>
      <div>
        Instructions: 
        <input type="text" v-model="newInstructions">
      </div>
      <div>
        Notes: 
        <input type="text" v-model="newNotes">
      </div>
      <div>
        Image URL: 
        <input type="text" v-model="newImageUrl">
      </div>
    </div>
    <button v-on:click="addRecipe()">Add</button>

    <div v-for="recipe in recipes">
      <h2>Name: {{ recipe.name }}</h2>
      <h3>Source: {{ recipe.source }}</h3>
      <!-- <h4>URL: {{ recipe.recipe_url }}</h4>
      <p>Total Prep Time (in Min): {{ recipe.total_prep_time }}</p>
      <p>Intro: {{ recipe.intro }}</p>
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Instructions: {{ recipe.instructions }}</p>
      <p>Notes: {{ recipe.notes }}</p> -->
      <img :src="`${recipe.image_url}`" />
      <div>
        <button v-on:click="showRecipe(recipe)">Show more info</button>
      </div>
    </div>
    <dialog id="recipe-details">
      <form method="dialog">
        <h1>Recipe Info</h1>
        <p>
          Name: <input type="text" v-model="currentRecipe.name" />
        </p>
        <p>
          Source: 
          <input type="text" v-model="currentRecipe.source">
        </p>
        <p>
          Recipe URL: 
          <input type="text" v-model="currentRecipe.recipe_url">
        </p>
        <p>
          Servings: 
          <input type="text" v-model="currentRecipe.servings">
        </p>
        <p>
          Total Prep Time: 
          <input type="text" v-model="currentRecipe.total_prep_time">
        </p>
        <p>
          Intro: 
          <input type="text" v-model="currentRecipe.intro">
        </p>
        <p>
          Ingredients: 
          <input type="text" v-model="currentRecipe.ingredients">
        </p>
        <p>
          Instructions: 
          <input type="text" v-model="currentRecipe.instructions">
        </p>
        <p>
          Notes: 
          <input type="text" v-model="currentRecipe.notes">
        </p>
        <p>
          Image URL: 
          <input type="text" v-model="currentRecipe.image_url">
        </p>
        <button v-on:click="updateRecipe(currentRecipe)">Update</button>
        <button v-on:click="destroyRecipe(currentRecipe)">Delete</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
img{
  width: 400px;
}
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      recipes: [],
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
      currentRecipe: {}
    };
  },
  created: function() {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function() {
      axios.get("/api/recipes").then(response => {
        this.recipes = response.data;
        console.log("All Recipes:", this.recipes);
      });
    },
    addRecipe: function() {
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
          console.log("Success", response.data);
          this.recipes.push(response.data);
          this.newName = "";
          this.newSource = "";
          this.newRecipeUrl = "";
          this.newServings = "";
          this.newTotalPrepTime = "";
          this.newIntro = "";
          this.newIngredients = "";
          this.newInstructions = "";
          this.newNotes = "";
          this.newImageUrl = "";
        })
        .catch(error => console.log(error.response));
    },
    showRecipe: function(recipe) {
      this.currentRecipe = recipe;
      document.querySelector("#recipe-details").showModal();
    },
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
          console.log("Success", response.data);
        })
        .catch(error => console.log(error.response));
    },
    destroyRecipe: function(recipe) {
      axios
        .delete("/api/recipes/" + recipe.id)
        .then(response => {
          console.log("Recipe deleted", response.data);
          var index = this.recipes.indexOf(recipe);
          this.recipes.splice(index, 1);
        })
    }
  },
};
</script>
