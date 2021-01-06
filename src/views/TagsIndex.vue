<template>
  <div class="tags-index">
    
    <!-- Title and Sort -->
    <section class="bg-theme-color-light p-0 rounded">
      <div class="container py-3 d-flex mb-3 justify-content-between align-items-center">
        <h1 class="h3 mb-0">
          Tags
        </h1>
      </div>
		</section>

    <!-- Columns of buttons -->
    <div class="container mx-5 my-3" v-if="isLoaded && tags.length > 0">
      <div class="row align-items-center">
        <div class="col-12 col-lg-4" v-for="tag in tags">
            <router-link class="btn btn-sm btn-outline-pink btn-pill m-1 ml-3" v-bind:to="`/tags/${tag.id}`">{{ tag.name }}</router-link>
        </div>
      </div>
    </div>
  </div>  
</template>

<style>
.tag-img {
  width: 100%;
  height: 10vw;
  object-fit: cover;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      tags: [],
      isLoaded: false,
    };
  },
  created: function() {
    axios
      .get("/api/tags")
      .then(response => {
        console.log("tags index", response);
        this.tags = response.data;
        this.isLoaded = true;
      });
  },
  methods: {},
};
</script>