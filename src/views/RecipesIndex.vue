<template>
  <div class="recipes-index">
    <h1>All Recipes</h1>
    <div v-for="recipe in recipes">
      <h2>Name: {{ recipe.name }}</h2>
      <h3>Source: {{ recipe.source }}</h3>
      <h4>Tags: {{ recipe.tags }}</h4>

      <!-- <h4>URL: {{ recipe.recipe_url }}</h4>
      <p>Total Prep Time (in Min): {{ recipe.total_prep_time }}</p>
      <p>Intro: {{ recipe.intro }}</p>
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Instructions: {{ recipe.instructions }}</p>
      <p>Notes: {{ recipe.notes }}</p> -->
      <!-- <img :src="`${recipe.image_url}`" /> -->
      <div>
        <button v-on:click="showRecipe(recipe)">Show more info</button>
      </div>
    </div>
  </div>
</template>

<style>
img
{
  width: 400px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      recipes: [],
    };
  },
  created: function() {
    axios
      .get("/api/recipes")
      .then(response => {
        console.log("recipes index", response);
        this.recipes = response.data;
      });
  },
  methods: {},
};
</script>