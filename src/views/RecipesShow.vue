<template>
  <div class="recipes-show">
    <h2>Name: {{ recipe.name }}</h2>
    <h3>Source: {{ recipe.source }}</h3>
    <div v-for="tag in recipe.tags">
      <h4>
        <router-link v-bind:to="`/tags/${tag.id}`">Tags: {{ tag.name }}</router-link>
      </h4>
    </div>
    <h4>URL: {{ recipe.recipe_url }}</h4>
    <p>Total Prep Time (in Min): {{ recipe.total_prep_time }}</p>
    <p>Intro: {{ recipe.intro }}</p>
    <p>Ingredients: {{ recipe.ingredients }}</p>
    <p>Instructions: {{ recipe.instructions }}</p>
    <p>Notes: {{ recipe.notes }}</p>
    <img :src="`${recipe.image_url}`" v-bind:alt="recipe.name" />
    <div>
      <p>
        <router-link v-bind:to="`/recipes/${recipe.id}/edit`">Edit Recipe</router-link>
      </p>
      <p>
        <button v-on:click="destroyRecipe(recipe)">Delete Recipe</button>
      </p>
      <p>
        <router-link to="/recipes">Back to All Recipes</router-link>
      </p>
    </div>
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
      recipe: {},
      tag: {},
      tags: []
    };
  },
  created: function() {
    axios
      .get("/api/recipes/" + this.$route.params.id)
      .then(response => {
        console.log("recipes show", response);
        this.recipe = response.data;
      });
  },
  methods: {
    destroyRecipe: function(recipe) {
      axios
        .delete("/api/recipes/" + recipe.id)
        .then(response => {
          console.log("recipes destroy", response);
          this.$router.push("/recipes");
        });
    },
  },
};
</script>