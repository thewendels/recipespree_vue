<template>
  <div class="recipes-show">
    <h2>Name: {{ recipe.name }}</h2>
    <a v-if="recipe.recipe_url" :href="recipe.recipe_url" target="_blank"><h3>Source: {{ recipe.source }}</h3></a>
    <h3 v-else>Source: {{ recipe.source }}</h3>
    <h4>Tags</h4>
    <div v-for="tag in recipe.tags">
      <h5>
        <router-link v-bind:to="`/tags/${tag.id}`">{{ tag.name }}</router-link>
      </h5>
      <button v-on:click="destroyRecipeTag(tag)">Delete Tag</button>
    </div>
    <div>
      <button v-on:click="showTagInput()" v-if="tagFieldAppear !== true">Add Tag</button>
      <form v-if="tagFieldAppear === true" v-on:submit.prevent="createRecipeTag()">
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
        <div>
          <div>
            Tag Name: <input type="text" v-model="tagName" />
          </div>
          <input type="submit" value="Add Tag" />
        </div>
      </form>
    </div>
    <p v-if="recipe.total_prep_time !== null">Total Prep Time: {{ recipe.friendly_prep_time }}</p>
    <p v-if="recipe.intro !== '' ">Intro: {{ recipe.intro }}</p>
    <p>Ingredients:</p>
    <ul v-for="ingredient in recipe.stepped_ingredients">
      <li>{{ ingredient }}</li>
    </ul>
    <p>Instructions:</p>
    <div v-for="instruction in recipe.stepped_instructions">
      <p>{{ instruction }}</p>
    </div>
    <p v-if="recipe.notes !== '' ">Notes: {{ recipe.notes }}</p>
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
      tags: [],
      tagFieldAppear: false,
      tagName: "",
      errors: []
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
    showTagInput: function() {
      this.tagFieldAppear = !(this.tagFieldAppear);
    },
    createRecipeTag: function() {
      var params = {
        tag_name: this.tagName,
        recipe_id: this.recipe.id,
      };
      axios 
        .post("/api/recipe_tags", params)
        .then(response => {
          console.log("recipetags create", response.data);
          this.recipe = response.data;
          this.tagName = "";
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