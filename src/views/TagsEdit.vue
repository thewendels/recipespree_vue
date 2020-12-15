<template>
  <div class="tags-edit">
    <h1>Edit Tag</h1>
    <form v-on:submit.prevent="updateTag(tag)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Name: <input type="text" v-model="tag.name" />
      <input type="submit" value="Update" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      tag: {},
      errors: [],
    };
  },
  created: function() {
    axios
      .get("/api/tags/" + this.$route.params.id)
      .then(response => {
        console.log("tags show", response);
        this.tag = response.data;
      });
  },
  methods: {
    updateTag: function(tag) {
      var params = {
        name: tag.name,
      };
      axios
        .patch("/api/tags/" + tag.id, params)
        .then(response => {
          console.log("tags update", response);
          this.$router.push("/tags");
        })
        .catch(error => {
          console.log("tags update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>