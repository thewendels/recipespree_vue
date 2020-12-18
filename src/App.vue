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
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>