<template>
  <div class="home">
    <h1>RECIPES</h1>
    <div v-for="recipe in recipes">
      <h1>Name: {{ recipe.name }}</h1>
      <h2>Source: {{ recipe.source }}</h2>
      <!-- <h3>URL: {{ recipe.recipe_url }}</h3>
      <p>Total Prep Time (in Min): {{ recipe.total_prep_time }}</p>
      <p>Intro: {{ recipe.intro }}</p>
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Instructions: {{ recipe.instructions }}</p>
      <p>Notes: {{ recipe.notes }}</p> -->
      <img :src="`${recipe.image_url}`" />
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      recipes: [],
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
  },
};
</script>
