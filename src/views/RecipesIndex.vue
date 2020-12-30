<template>
  <div class="recipes-index">
    <h4 v-if="this.$route.query.search">Search results for: {{ this.$route.query.search }}</h4>
    <h1>All Recipes</h1>
    <h4>Sort</h4>
    <select v-model.lazy="selected">
      <option disabled value="">Please select one:</option>
      <option value="alpha">A-Z</option>
      <option value="revAlpha">Z-A</option>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
    </select>
    <div v-for="recipe in orderBy(recipes, sortKey, sortOrder)">
      <h2><router-link v-bind:to="`/recipes/${recipe.id}`">Name: {{ recipe.name }}</router-link></h2>
      <h3>Source: {{ recipe.source }}</h3>
      <h4 v-if="recipe.tags.length !== 0">Tags</h4>
      <div v-for="tag in recipe.tags">
        <h5><router-link v-bind:to="`/tags/${tag.id}`">{{ tag.name }}</router-link></h5>
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
import Vue2Filters from 'vue2-filters';
export default {
  data: function() {
    return {
      tag: {},
      tags: [],
      recipe: {},
      recipes: [],
      selected: "",
    };
  },
  mixins: [Vue2Filters.mixin],
  created: function() {
    let path;
    if (this.$route.query.search) {
      path = "/api/recipes?search=" + this.$route.query.search;
    }
    else {
      path = "/api/recipes";
    }
    axios
      .get(path)
      .then(response => {
        console.log("recipes index", response);
        this.recipes = response.data;
      });
    axios
      .get("/api/tags")
      .then(response => {
        console.log("tags index", response);
        this.tags = response.data;
      });
  },
  computed: {
    sortKey: function() {
      if (this.selected === "alpha" || this.selected === "revAlpha") {
        return "name";
      } else if (this.selected === "newest" || this.selected === "oldest") {
        return "id";
      } else {
        return "";
      }   
    },
    sortOrder: function() {
      if (this.selected === "alpha" || this.selected === "oldest") {
        return 1;
      } else if (this.selected === "revAlpha" || this.selected === "newest") {
        return -1;
      } else {
        return "";
      }    
    },
  },
  watch: {
    $route: function(to, from) {
      let path;
      if (to.query.search) {
        path = "/api/recipes?search=" + to.query.search;
      } else {
        path = "/api/recipes";
      }
      axios
        .get(path)
        .then(response => {
          console.log("recipes index", response);
          this.recipes = response.data;
        });
    }
  },
  methods: {
  },
};
</script>