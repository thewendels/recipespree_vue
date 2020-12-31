<template>
  <div id="app">
    <div id="nav">
      <router-link to="/recipes">Home</router-link> | 
      <router-link to="/recipes">All Recipes</router-link> | 
      <router-link to="/recipes/new">Add a Recipe</router-link> | 
      <router-link to="/tags">All Tags</router-link> | 
      <router-link v-if="isLoggedIn()"
      to="/users">Profile</router-link> | 
      <router-link v-if="!isLoggedIn()" to="/signup">Sign Up</router-link> |  
      <router-link v-if="!isLoggedIn()" to="/login">Log In</router-link> | <router-link v-if="isLoggedIn()" to="/logout">Log Out</router-link>
      <form v-on:submit.prevent="searchRecipes()"> 
        <input type="text" v-model="search">
        <input type="submit" value="Search" />
      </form>
    </div>

    <ul class="nav pt-2 pb-2 shadow-md border rounded bg-light">
      <li class="nav-item">
        <a class="nav-link active" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
      <li class="list-inline-item mx-1 dropdown">

            <a href="#" aria-label="Account Options" id="dropdownAccountOptions" class="btn btn-sm rounded-circle btn-primary btn-soft-static" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
              <span class="group-icon">
                <i class="fi fi-user-male"></i>
                <i class="fi fi-close"></i>
              </span>
            </a>
      </li>
    </ul>
									




    <router-view/>
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function() {
    return {
      search: "",
    }   
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
    searchRecipes() {
      this.$router.push({ path: '/recipes', query: { search: this.search }});
      this.search = "";
    }
  }
};
</script>