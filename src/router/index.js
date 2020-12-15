import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import RecipesIndex from "../views/RecipesIndex.vue";
import RecipesNew from "../views/RecipesNew.vue";
import RecipesShow from "../views/RecipesShow.vue";
import RecipesEdit from "../views/RecipesEdit.vue";
import TagsIndex from "../views/TagsIndex.vue";
import TagsShow from "../views/TagsShow.vue";
import Signup from '../views/Signup.vue';
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipes',
    name: 'recipes-index',
    component: RecipesIndex
  },
  {
    path: '/recipes/new',
    name: 'recipes-new',
    component: RecipesNew
  },
  {
    path: "/recipes/:id",
    name: "recipes-show",
    component: RecipesShow,
  },
  {
    path: "/recipes/:id/edit",
    name: "recipes-edit",
    component: RecipesEdit,
  },
  {
    path: "/tags",
    name: "tags-index",
    component: TagsIndex,
  },
  {
    path: "/tags/:id",
    name: "tags-show",
    component: TagsShow,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
