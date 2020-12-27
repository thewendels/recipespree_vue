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
      this.$router.push({ path: 'recipes', query: { search: this.search }});
      this.search = "";
    }
  }
};
</script>