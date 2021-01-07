<template>
  <div class="recipes-index">

    <!-- Title and Sort -->
    <section class="bg-theme-color-light p-0 rounded" v-if="recipes.length > 0">
      <div class="container py-3 d-flex mb-3 justify-content-between align-items-center">
        <h1 class="h3 mb-0">
          Recipes
        </h1>
        <div class="d-flex">
          <h6 class="m-2">Sort:</h6>
          <select v-model.lazy="selected" class="px-2 rounded">
            <option value="newest"> Newest </option>
            <option value="oldest"> Oldest </option>
            <option value="alpha"> A - Z </option>
            <option value="revAlpha"> Z - A </option>
          </select>
        </div>
      </div>
		</section>
    
    <!-- Waiting for recipes to load -->
    <div v-if="!isLoaded" class="text-center">
      <div class="fs--30 fi fi-spin fi-loading-dots text-pink" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <!-- Message (if user has no recipes) -->
    <div v-if="isLoaded && !this.$route.query.search && recipes.length == 0" class="my-5 mx-3 d-flex align-items-center justify-content-center">
      <h5 class="mx-3 align-items-start" >Welcome to RecipeSpree!</h5>
      <div>
        <p>To get started, click on <strong>Add a Recipe</strong> above. You can fill in your recipe's details one field at a time, or import the recipe by entering its URL.</p>
        <p>Once your recipe is created, add tags to organize it within your collection. You might categorize it by course (Entree, Dessert), type of cuisine (Italian, Thai), style (Healthy, Special Occasion, Quick and Easy, Vegetarian), but ultimately it's up to you!</p>
        <p>You can click on a tag name to access all the recipes that share it.</p>
        <p>Enjoy!</p>
      </div>
    </div>

    <!-- Cards (search results and cards) -->
    <div class="container">
      <!-- Search Results -->
      <div class="m-3">
        <p v-if="this.$route.query.search && recipes.length == 0">There are no search results for: "{{ this.$route.query.search }}"</p>
        <p v-else-if="this.$route.query.search">Search results for: "{{ this.$route.query.search }}"</p>
      </div>
      <!-- Cards -->
      <div v-if="isLoaded && recipes.length > 0">
        <div class="row">
          <div class="col-12 col-lg-4 mb-4" v-for="recipe in orderBy(recipes, sortKey, sortOrder)">
            <router-link v-bind:to="`/recipes/${recipe.id}`">
              <div class="card b-0 shadow-primary-xs shadow-primary-md-hover transition-all-ease-250 transition-hover-top h3-100 rounded overflow-hidden h-100">
                <div class="clearfix">
                  <img v-if="recipe.image_url" class="card-img" :src="`${recipe.image_url}`" v-bind:alt="recipe.name">
                  <img v-else class="card-img" src="/assets/images/default-recipe-photo.png" v-bind:alt="recipe.name">
                </div>
                <div class="card-body font-weight-light">
                  <h5 style="color: #212529">{{ recipe.name }}</h5>
                  <p>{{ recipe.source }}</p>
                  <router-link v-if="recipe.tags.length !== 0" v-for="tag in recipe.tags" class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0" style="font-size:0.75rem" v-bind:to="`/tags/${tag.id}`" :key="tag.id">{{ tag.name }}</router-link>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
.card-img {
  width: 100%;
  height: 25vw;
  object-fit: cover;
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
      isLoaded: false,
      selected: "newest",
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
        this.isLoaded = true;
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
  methods: {},
};
</script>