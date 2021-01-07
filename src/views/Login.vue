<template>
  <div class="login">

    <!-- DEAL WITH errors
    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul> -->

    <!-- Title -->
    <section class="bg-theme-color-light position-relative py-4">
      <div class="container">

        <h1 class="h3">
          RecipeSpree
        </h1>

      </div>
    </section>

    <!-- Form and Image -->
    <section>
      <div class="container">
        <div class="row">
          <!-- Form -->
          <div class="col-12 col-sm-12 offset-sm-0 col-md-8 offset-md-2 col-lg-6 offset-lg-0 order-2 order-lg-1">
            <div class="accordion" id="accordionAccount">
              
              <!-- Sign In -->
              <form class="collapse bs-validate show" v-on:submit.prevent="submit()" action="#" id="accordionAccountSignIn" data-parent="#accordionAccount">

                <!-- Title -->
                <h2 class="dark-text mb-1">Sign In</h2>

                <!-- Form for email and password -->
                <div class="p-5 rounded shadow-xs">
                  <div class="form-label-group mb-3">
                    <input required placeholder="Email" id="email" v-model="email" name="email" type="email" class="form-control">
                    <label for="email">Email</label>
                  </div>

                  <div class="input-group-over">
                    <div class="form-label-group mb-3">
                      <input required placeholder="Password" id="password" v-model="password" name="password" type="password" class="form-control">
                      <label for="password">Password</label>
                    </div>

                    <!-- <a href="#accordionAccountPasswd" class="btn btn-pill fs--12 text-primary" data-toggle="collapse" aria-expanded="true" aria-controls="accordionAccountPasswd">
                      Forgot?
                    </a> -->
                  </div>

                  <button type="submit" class="btn btn-outline-dark btn-block btn-pill">
                    Sign In
                  </button>

                  <div class="text-center mt--30">
                    <a href="#accordionAccountSignUp" class="d-block text-primary text-decoration-none" data-toggle="collapse" aria-expanded="true" aria-controls="accordionAccountSignUp">
                      Don't have an account yet?
                    </a>
                  </div>
                </div>
              </form>
              <!-- /Sign In -->



              <!-- Password Reset -->
              <!-- <form class="collapse bs-validate" novalidate method="post" action="#" id="accordionAccountPasswd" data-parent="#accordionAccount">
                
                <!-- Title -->
                <!-- <h2 class="dark-text mb-1">Password Reset</h2>
                <div class="p-5 rounded shadow-xs">
                  <h2 class="h5 text-center mb-5 mt-3">
                    Password reset instructions will be sent to your email.
                  </h2>
                  <div class="form-label-group mb-4">
                    <input required placeholder="Email" id="reset_email" name="reset_email" type="email" class="form-control">
                    <label for="reset_email">Email</label>
                  </div>
                  <button type="submit" class="btn btn-outline-dark btn-block btn-pill">
                    Reset Password
                  </button>

                  <div class="text-center mt--30">
                    <a href="#accordionAccountSignIn" class="d-block text-primary text-decoration-none" data-toggle="collapse" aria-expanded="true" aria-controls="accordionAccountSignIn">
                      Nevermind, back to Sign In
                    </a>
                  </div>
                </div>
              </form> -->
              <!-- /Password Reset -->

              <!-- Sign Up -->
              <form class="collapse bs-validate" novalidate method="post" action="#" id="accordionAccountSignUp" data-parent="#accordionAccount">
                
                <!-- title -->
                <h2 class="text-primary mb-1">
                  <span class="font-weight-normal">Sign</span> Up
                </h2>
                <p class="mb-5 font-weight-medium b-0">
                  Get started! It's Free!
                </p>

                <div class="p-5 rounded shadow-xs">


                  <!--
                  <p class="text-danger">
                    Ups! Please check again
                  </p>
                  -->


                  <div class="form-label-group mb-3">
                    <input required placeholder="First Name" id="signup_first_name" name="signup_first_name" type="text" class="form-control">
                    <label for="signup_first_name">First Name</label>
                  </div>

                  <div class="form-label-group mb-3">
                    <input required placeholder="Last Name" id="signup_last_name" name="signup_last_name" type="text" class="form-control">
                    <label for="signup_last_name">Last Name</label>
                  </div>

                  <div class="form-label-group mb-3">
                    <input required placeholder="Email" id="signup_email" name="signup_email" type="email" class="form-control">
                    <label for="signup_email">Email</label>
                  </div>

          

                  <div class="input-group-over">
                    <div class="form-label-group mb-3">
                      <input required placeholder="Password" id="signup_password" name="signup_password" type="password" class="form-control">
                      <label for="signup_password">Password</label>
                    </div>

                  </div>

                  <button type="submit" class="btn btn-primary btn-soft btn-block">
                    Sign Up
                  </button>

                  <div class="text-center mt--30">
                    <a href="#accordionAccountSignIn" class="d-block text-muted text-decoration-none" data-toggle="collapse" aria-expanded="true" aria-controls="accordionAccountSignIn">
                      Back to Sign In
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- RecipeSpree Logo Image -->
          <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-0 order-1 order-lg-2">
            <img class="img-fluid mt--n50" src="/assets/images/logo/rs_monogram.png" alt="RecipeSpree Logo">
          </div>
        </div>
      </div>
    </section>



















    <!-- <form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      
      <div class="form-group">
        <label>Email: </label>
        <input type="email" class="form-control" v-model="email">
      </div> -->
      <div class="form-group">
        <label>Password: </label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <input type="submit" class="btn btn-primary" value="Submit">
    </form>
  </div>
</template>

<style>
.dark-text {
  color: #212529;
}
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/recipes");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>