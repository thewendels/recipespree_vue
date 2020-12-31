<template>
  <div class="bg-theme-color-light container pt-3" id="app">
    <!-- <div id="nav" class="pt-3"> 
      
      <router-link v-if="isLoggedIn()"
      to="/users">Profile</router-link> | 
      <router-link v-if="!isLoggedIn()" to="/signup">Sign Up</router-link> |  
      <router-link v-if="!isLoggedIn()" to="/login">Log In</router-link>
      
    </div> -->

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light justify-content-lg-between justify-content-md-inherit pt-2 pb-2 shadow-md border rounded bg-light">

      <!-- Logo -->
      <div class="align-items-start">
        <router-link class="navbar-brand" to="/recipes">MONOGRAM</router-link>
      </div>
      
      <!-- Links -->
      <ul class="nav collapse navbar-collapse navbar-animate-fadein">
        <li class="nav-item">
          <router-link class="nav-link" to="/recipes">All Recipes</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/recipes/new">Add a Recipe</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/tags">All Tags</router-link>
        </li>
      </ul>

      <!-- Search -->
      <ul class="list-inline list-unstyled mb-0 d-flex align-items-end">
          <form v-on:submit.prevent="searchRecipes()"> 
            <input type="text" v-model="search">
            <input type="submit" value="Search" />
          </form>

          <!-- Account Options Dropdown -->
          <ul class="list-inline list-unstyled mb-0 d-flex align-items-end">
            <li class="list-inline-item mx-1 dropdown">

              <a href="#" aria-label="Account Options" id="dropdownAccountOptions" class="btn btn-sm rounded-circle btn-primary btn-soft-static" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
                <span class="group-icon">
                  <i class="fi fi-user-male"></i>
                  <i class="fi fi-close"></i>
                </span>
              </a>
              <div aria-labelledby="dropdownAccountOptions" class="prefix-link-icon dropdown-menu dropdown-menu-clean dropdown-menu-invert dropdown-click-ignore p-0 mt--18 fs--15">
                <div class="dropdown-divider"></div>
                <router-link to="/users" title="Profile" class="dropdown-footer dropdown-custom-ignore">
                  Profile
                </router-link>
                <router-link to="/logout" title="Log Out" class="prefix-icon-ignore dropdown-footer dropdown-custom-ignore">
                  <i class="fi fi-power float-start"></i>
                  Log Out
                </router-link>
              </div>
            </li>
          </ul>
        </ul>
		</nav>				
    
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