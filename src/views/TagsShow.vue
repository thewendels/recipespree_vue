<template>
  <div class="tags-show">
    <h2>{{ tag.name }}</h2>
    <div v-for="recipe in tag.recipes">
      <h3>{{ recipe }}</h3>
    </div>
    <router-link to="/tags">Back to All Tags</router-link>
  </div>
</template>

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
      .get("/api/tags/" + this.$route.params.id).then(response => {
        console.log("tags show", response);
        this.tag = response.data;
      });
  },
  methods: {},
};
</script>