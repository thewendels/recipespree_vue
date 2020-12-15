<template>
  <div class="home">
    <h1>Recipes</h1>
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
