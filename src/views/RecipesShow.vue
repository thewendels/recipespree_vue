/* eslint-disable vue/no-dupe-v-else-if */
<template>
  <div class="recipes-show">
    <h2>Name: {{ recipe.name }}</h2>
    <a v-if="recipe.recipe_url && recipe.source" :href="recipe.recipe_url" target="_blank"><h3>Source: {{ recipe.source }}</h3></a>
    <a v-else-if="!recipe.source && recipe.recipe_url" :href="recipe.recipe_url" target="_blank"><h3>Source: {{ recipe.recipe_url }}</h3></a>
    <h3 v-else-if="!recipe.recipe_url && recipe.source">Source: {{ recipe.source }}</h3>
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
    <h4>Tags</h4>
    <div v-for="tag in recipe.tags">
      <h5>
        <router-link v-bind:to="`/tags/${tag.id}`">{{ tag.name }}</router-link>
      </h5>
      <button v-on:click="destroyRecipeTag(tag)">Delete Tag</button>
    </div>
    <div>
      <button v-on:click="showTagManager()" v-if="tagManagerAppear !== true">Add Tag</button>
      <form v-if="tagManagerAppear === true" v-on:submit.prevent="createRecipeTag()">
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
        <div>
          <select v-model.lazy="dropdownSelection">
            <option disabled value="">Select a tag:</option>
            <option value="userInputNew">Create new tag</option>
            <option :value="`${tag.name}`" v-for="tag in tags">{{ tag.name }}</option>
          </select>
          <div v-if="dropdownSelection === 'userInputNew'">
            Tag Name: <input type="text" v-model="tagInput" />
          </div>
          <div>
            <button v-on:click="showTagManager()">Cancel</button>
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>

    <p v-if="recipe.total_prep_time">Total Prep Time: {{ recipe.friendly_prep_time }}</p>
    <p v-if="recipe.intro">Intro: {{ recipe.intro }}</p>
    <p>Ingredients:</p>
    <ul v-for="ingredient in recipe.stepped_ingredients">
      <li>{{ ingredient }}</li>
    </ul>
    <p>Instructions:</p>
    <div v-for="instruction in recipe.stepped_instructions">
      <p>{{ instruction }}</p>
    </div>
    <p v-if="recipe.notes">Notes: {{ recipe.notes }}</p>
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
      tagManagerAppear: false,
      dropdownSelection: "",
      tagInput: "",
      errors: [],
    };
  },
  created: function() {
    axios
      .get("/api/recipes/" + this.$route.params.id)
      .then(response => {
        console.log("recipes show", response);
        this.recipe = response.data;
      });
    axios
      .get("/api/tags/")
      .then(response => {
        console.log("tags show", response);
        this.tags = response.data;
      });
  },
  methods: {
    showTagManager: function() {
      this.tagManagerAppear = !(this.tagManagerAppear);
      this.dropdownSelection = "";
    },
    createRecipeTag: function() {
      let tag;
      if (this.dropdownSelection === "userInputNew") {
        tag = this.tagInput;
      } else {
        tag = this.dropdownSelection;
      }
      var params = {
        tag_name: tag,
        recipe_id: this.recipe.id,
      };
      axios 
        .post("/api/recipe_tags", params)
        .then(response => {
          console.log("recipetags create", response.data);
          this.recipe = response.data;
          this.dropdownSelection = "";
          this.tagManagerAppear = false;
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