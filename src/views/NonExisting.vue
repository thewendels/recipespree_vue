<template>
  <div class="non-existing">

    <section class="bg-theme-color-light p-0 rounded">
      <div class="container py-3 d-flex mb-3 justify-content-between align-items-center">
        <div>
          <h1 class="h3 mb-0">Page not found!</h1>
        </div>
        <div class="d-flex">
          <router-link class="btn btn-sm rounded-circle btn-pink btn-soft-static" data-toggle="tooltip" data-placement="bottom" title="Home" to="/recipes/">
            <i class="fi fi-home"></i>
          </router-link>
        </div>
    </div>
		</section>
    <div class="mb-3 mx-5 d-flex justify-content-center">
      <img class="error-image rounded-xl px-0 m-2" src="/assets/images/sad-citrus.jpg" alt="sad citrus" />
    </div>
    <div class="text-center">
      <router-link to="/recipes" class="btn btn-sm btn-outline-pink btn-pill mb-1 mr-1 ml-0">Home</router-link>
    </div>
  </div>
</template>

<style>
.error-image {
  width: 30%;
  height: 30%;
  object-fit: contain;
} 
</style>