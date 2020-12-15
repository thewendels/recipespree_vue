<template>
  <div class="recipes-index">
    <h1>All Recipes</h1>
    <div v-for="recipe in recipes">
      <h2>Name: {{ recipe.name }}</h2>
      <h3>Source: {{ recipe.source }}</h3>
      <h4>Tags: {{ recipe.tags }}</h4>
      <div>
        <router-link v-bind:to="`/recipes/${recipe.id}`">More Details</router-link>
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