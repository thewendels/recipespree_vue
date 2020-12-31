<template>
  <div class="recipes-index">

    <!-- Title -->
    <div class="m-2 p-2">
      <h3>All Recipes</h3>
    </div>

    <!-- Search results -->
    <p v-if="this.$route.query.search">Search results for: "{{ this.$route.query.search }}"</p>
    
    <!-- Sort -->
    <div class="d-flex justify-content-end mb-3">
      <h6 >Sort</h6>
      <select v-model.lazy="selected">
        <option disabled value="">Please select one:</option>
        <option value="alpha">A-Z</option>
        <option value="revAlpha">Z-A</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>

    <!-- Cards -->
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-4 mb-4" v-for="recipe in orderBy(recipes, sortKey, sortOrder)">
          <div class="card b-0 shadow-primary-xs shadow-primary-md-hover transition-all-ease-250 transition-hover-top h3-100 rounded overflow-hidden h-100">
            <div class="clearfix">
              <router-link v-bind:to="`/recipes/${recipe.id}`"><img class="" :src="`${recipe.image_url}`" alt="..."></router-link>
            </div>
            <div class="card-body font-weight-light">
              <h5><router-link v-bind:to="`/recipes/${recipe.id}`">{{ recipe.name }}</router-link></h5>
              <p>{{ recipe.source }}</p>
              <router-link v-if="recipe.tags.length !== 0" v-for="tag in recipe.tags" class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0" style="font-size:0.75rem" v-bind:to="`/tags/${tag.id}`" :key="tag.id">{{ tag.name }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
img {
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