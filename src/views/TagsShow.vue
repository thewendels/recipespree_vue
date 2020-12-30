<template>
  <div class="tags-show">
    <h2>{{ tag.name }}</h2>
     <div> 
      <router-link v-bind:to="`/tags/${tag.id}/edit`">Edit Tag</router-link>
    </div>
    <div>
      <button v-on:click="destroyTag(tag)">Delete Tag</button>
    </div>
    <div v-for="recipe in tag.recipes">
      <router-link v-bind:to="`/recipes/${recipe.id}`">
        <h3>{{ recipe.name }}</h3>
      </router-link>
    </div>
    <div>   
      <router-link to="/tags">Back to All Tags</router-link>
    </div>
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
  methods: {
    destroyTag: function(tag) {
      axios.delete("/api/tags/" + tag.id).then(response => {
        console.log("tags destroy", response);
        this.$router.push("/tags");
      });
    },
  },
};
</script>