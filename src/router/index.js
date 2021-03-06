import Vue from 'vue';
import VueRouter from 'vue-router';
import RecipesIndex from "../views/RecipesIndex.vue";
import RecipesNew from "../views/RecipesNew.vue";
import RecipesShow from "../views/RecipesShow.vue";
import RecipesEdit from "../views/RecipesEdit.vue";
import TagsIndex from "../views/TagsIndex.vue";
import TagsShow from "../views/TagsShow.vue";
import TagsEdit from "../views/TagsEdit.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import NonExisting from "../views/NonExisting.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'recipes-index',
    component: RecipesIndex
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
    path: "/tags/:id/edit",
    name: "tags-edit",
    component: TagsEdit,
  },
  {
    path: "/users",
    name: "users-show",
    component: UsersShow,
  },
  {
    path: "/users/edit",
    name: "users-edit",
    component: UsersEdit,
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
  },
  {
    path: '*',
    name: 'non-existing',
    component: NonExisting
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem("jwt");
  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
