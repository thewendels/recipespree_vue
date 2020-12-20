<template>
  <div class="recipes-new">
    <h1>Add a Recipe</h1>
    <form v-on:submit.prevent="createRecipe()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <div>
        <div>
          Name*: 
          <input type="text" v-model="newName">
        </div>
        <div>
          Source: 
          <input type="text" v-model="newSource">
        </div>
        <div>
          Recipe URL: 
          <input type="text" v-model="newRecipeUrl">
        </div>
        <div>
          Servings: 
          <input type="text" v-model="newServings">
        </div>
        <div>
          Total Prep Time (in Minutes): 
          <input type="text" v-model="newTotalPrepTime">
        </div>
        <div>
          Intro: 
          <input type="text" v-model="newIntro">
        </div>
        <div>
          Ingredients*: 
          <input type="text" v-model="newIngredients">
        </div>
        <div>
          Instructions*: 
          <input type="text" v-model="newInstructions">
        </div>
        <div>
          Notes: 
          <input type="text" v-model="newNotes">
        </div>
        <div>
          Image URL: 
          <input type="text" v-model="newImageUrl">
        </div>
      </div>
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      newName: "",
      newSource: "",
      newRecipeUrl: "",
      newServings: "",
      newTotalPrepTime: "",
      newIntro: "",
      newIngredients: "",
      newInstructions: "",
      newNotes: "",
      newImageUrl: "",
      errors: [],
    };
  },
  created: function() {},
  methods: {
    createRecipe: function() {
      var params = {
        name: this.newName,
        source: this.newSource,
        recipe_url: this.newRecipeUrl,
        servings: this.newServings,
        total_prep_time: this.newTotalPrepTime,
        intro: this.newIntro,
        ingredients: this.newIngredients,
        instructions: this.newInstructions,
        notes: this.newNotes,
        image_url: this.newImageUrl,
      };

      axios 
        .post("/api/recipes", params)
        .then(response => {
          console.log("recipes create", response.data);
          this.$router.push("/recipes");
        })
        .catch(error => {
          console.log("recipes create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  }
}
</script>