<template>
  <div class="recipes-index">
    <h1>All Recipes</h1>
    <div v-for="recipe in recipes">
      <h2>Name: {{ recipe.name }}</h2>
      <h3>Source: {{ recipe.source }}</h3>
      <h4 v-if="recipe.tags.length !== 0">Tags</h4>
      <div v-for="tag in recipe.tags">
        <h5>{{ tag.name }}</h5>
      </div>
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
      tag: {},
      recipe: {},
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