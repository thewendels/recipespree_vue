<template>
  <div class="recipes-edit">
    <h1>Update Recipe</h1>
    <form v-on:submit.prevent="updateRecipe(recipe)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <p>
          Name*: <input type="text" v-model="recipe.name" />
        </p>
        <p>
          Source: 
          <input type="text" v-model="recipe.source">
        </p>
        <p>
          Recipe URL: 
          <input type="text" v-model="recipe.recipe_url">
        </p>
        <p>
          Servings: 
          <input type="text" v-model="recipe.servings">
        </p>
        <p>
          Total Prep Time: 
          <input type="text" v-model="recipe.total_prep_time">
        </p>
        <p>
          Intro: 
          <input type="text" v-model="recipe.intro">
        </p>
        <p>
          Ingredients*: 
          <input type="text" v-model="recipe.ingredients">
        </p>
        <p>
          Instructions*: 
          <input type="text" v-model="recipe.instructions">
        </p>
        <p>
          Notes: 
          <input type="text" v-model="recipe.notes">
        </p>
        <p>
          Image URL: 
          <input type="text" v-model="recipe.image_url">
        </p>
      <input type="submit" value="Update" />
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
      .get("/api/recipes/" + this.$route.params.id).
      then(response => {
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
        });
    },
  },
};
</script>