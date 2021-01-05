<template>
  <div class="bg-theme-color-light container pt-3" id="app">
    <!-- <div id="nav" class="pt-3"> 
      
      <router-link v-if="isLoggedIn()"
      to="/users">Profile</router-link> | 
      <router-link v-if="!isLoggedIn()" to="/signup">Sign Up</router-link> |  
      <router-link v-if="!isLoggedIn()" to="/login">Log In</router-link>
      
    </div> -->

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light justify-content-lg-between justify-content-lg-inherit pt-2 pb-2 shadow-md border rounded bg-light">

      <!-- Logo -->
      <router-link class="navbar-brand mr-0" to="/recipes">
        <img src="/assets/images/logo/rs_monogram.png" alt="RecipeSpree" style="object-fit:contain">
      </router-link>

      <!-- Toggler to hamburger menu -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Container for everything that should go in toggler -->
      <div class="collapse navbar-collapse d-flex-lg justify-content-lg-between" id="collapsibleNavbar">

        <!-- Text Links -->
        <ul class="nav navbar-animate-fadein flex-column flex-lg-row">
          <li class="nav-item">
            <router-link class="nav-link" to="/recipes" data-toggle="collapse" data-target=".navbar-collapse.show">All Recipes</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/recipes/new" data-toggle="collapse" data-target=".navbar-collapse.show">Add a Recipe</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/tags" data-toggle="collapse" data-target=".navbar-collapse.show">All Tags</router-link>
          </li>
        </ul>

        <!-- Search and Account -->
        <ul class="list-inline list-unstyled mb-0 d-flex align-items-lg-center flex-column flex-lg-row">
          <!-- Search -->
          <form v-on:submit.prevent="searchRecipes()" class="mx-2"> 
            <input type="text" v-model="search" class="mx-2">
            <input type="submit" data-toggle="collapse" data-target=".navbar-collapse.show" value="Search" class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0"/>
          </form>

          <!-- Account Options Dropdown - Larger Breakpoints -->
          <ul class="d-none d-lg-flex list-inline list-unstyled mb-0 align-items-end mr-2">
            <li class="list-inline-item mx-1 dropdown">
              
              <!-- Pink circle icon -->
              <a href="#" aria-label="Account Options" id="dropdownAccountOptions" class="btn btn-sm rounded-circle btn-pink btn-soft-static" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
                <span class="group-icon">
                  <i class="fi fi-users"></i>
                  <i class="fi fi-close"></i>
                </span>
              </a>
              
              <!-- Dropdown -->
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

          <!-- Account Options - Mobile -->
          <div class="d-lg-none">
            <router-link to="/users" title="Profile" class="dropdown-footer dropdown-custom-ignore" data-toggle="collapse" data-target=".navbar-collapse.show">
            Profile
            </router-link>
            <router-link to="/logout" title="Log Out" class="prefix-icon-ignore dropdown-footer dropdown-custom-ignore" data-toggle="collapse" data-target=".navbar-collapse.show">
              <i class="fi fi-power float-start"></i>
              Log Out
            </router-link>
          </div>

        </ul>
      </div>
		</nav>

    <!-- Citrus banner top -->
    <section class="bg-theme-color-light p-0 rounded" style="background-image:url(/assets/images/citrus.jpg); background-size:cover; height:150px"></section>				
    
    <router-view/>

    <!-- Citrus banner bottom-->
    <section class="bg-theme-color-light p-0 rounded" style="background-image:url(/assets/images/citrus2.jpg); background-size:cover; height:150px"></section>	

    <!-- Footer -->
    <footer class="pt-2 pb-2 shadow-md border rounded bg-light d-flex align-items-center justify-content-center">
      <p style="font-size:0.5rem" class="mb-0">© RecipeSpree.</p>
    </footer>

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