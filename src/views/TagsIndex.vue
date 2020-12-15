<template>
  <div class="tags-index">
    <h1>All Tags</h1>
    <div v-for="tag in tags">
      <h2>{{ tag.name }}</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      tags: [],
    };
  },
  created: function() {
    axios
      .get("/api/tags")
      .then(response => {
        console.log("tags index", response);
        this.tags = response.data;
    });
  },
  methods: {},
};
</script>