<template>
  <div class="login">

    <!-- Login Error Modal -->
    <div class="modal fade" id="loginErrorModal" tabindex="-1" role="dialog" aria-labelledby="login error modal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginError">Error</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Something went wrong!</p>
            <p>Your email or password is invalid.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-pink" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Signup Error Modal -->
    <div class="modal fade" id="signupErrorModal" tabindex="-1" role="dialog" aria-labelledby="signup error modal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="signupError">Error</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Something went wrong!</p>
            <ul>
              <li style="color: #6c757d" v-for="error in errors">{{ error }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-pink" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Title -->
    <section class="bg-theme-color-light position-relative py-3">
      <div class="container">

        <h1 class="h3">
          Welcome to RecipeSpree
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
              <form class="collapse bs-validate show" v-on:submit.prevent="submitLogin()" id="accordionAccountSignIn" data-parent="#accordionAccount">

                <!-- Title -->
                <h2 class="dark-text mb-2">Sign In</h2>

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

                  <!-- Sign In button -->
                  <button type="submit" class="btn btn-outline-dark btn-block btn-pill">
                    Sign In
                  </button>

                  <!-- Toggle to Signup -->
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
              <form class="collapse bs-validate" v-on:submit.prevent="submitSignup()" id="accordionAccountSignUp" data-parent="#accordionAccount">
                
                <!-- Title -->
                <h2 class="dark-text mb-2">Sign Up</h2>
                <div class="p-5 rounded shadow-xs">
                  
                  <!-- Form -->
                  <div class="form-label-group mb-3">
                    <input required placeholder="Username" id="username" name="username" type="text" class="form-control" v-model="username">
                    <label for="username">Username</label>
                    <small class="text-muted" v-if="username.length > 20">
                      Cannot exceed 20 characters
                    </small>
                  </div>
                  
                  <div class="form-label-group mb-3">
                    <input required placeholder="Email" id="email" v-model="signupEmail" name="email" type="email" class="form-control">
                    <label for="email">Email</label>
                  </div>

                  <div class="form-label-group mb-3">
                    <input required placeholder="Password" id="password" v-model="signupPassword" name="password" type="password" class="form-control">
                    <label for="password">Password</label>
                    <small class="text-muted" v-if="signupPassword.length > 3 && signupPassword.length < 8">
                      Must be at least 8 characters
                    </small>
                    <small class="text-muted" v-if="signupPassword.length > 20">
                      Cannot exceed 20 characters
                    </small>
                  </div>

                  <div class="form-label-group mb-3">
                    <input required placeholder="Password Confirmation" id="passwordConfirmation" v-model="passwordConfirmation" name="passwordConfirmation" type="password" class="form-control">
                    <label for="passwordConfirmation">Password Confirmation</label>
                  </div>

                  <!-- Sign Up button -->
                  <button type="submit" class="btn btn-outline-dark btn-block btn-pill">
                    Sign Up
                  </button>

                  <!-- Toggle to Login -->
                  <div class="text-center mt--30">
                    <a href="#accordionAccountSignIn" class="d-block text-primary text-decoration-none" data-toggle="collapse" aria-expanded="true" aria-controls="accordionAccountSignIn">
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
      username: "",
      email: "",
      signupEmail: "",
      password: "",
      signupPassword: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submitLogin: function() {
      var loginParams = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", loginParams)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/recipes");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          $('#loginErrorModal').modal('show');
        });
    },
    submitSignup: function() {
      var params = {
        username: this.username,
        email: this.signupEmail,
        password: this.signupPassword,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          return axios.post("/api/sessions", params);
        })
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/recipes");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          $('#signupErrorModal').modal('show');
        });
    }
  }
};
</script>