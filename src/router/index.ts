import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signin from "../views/Signin.vue";
import List from "../views/List.vue";
import News from "../views/news.vue";
import User from "../views/User.vue";
import Consultation from "../views/Consultation.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/list/:topic/:subTopic",
    name: "List",
    component: List,
  },
  {
    path: "/article/:id",
    name: "Article",
    component: News,
  },
  // {
  //   path: "/user",
  //   name: "User",
  //   component: User,
  // },
  {
    path: "/consultation",
    name: "Consultation",
    component: Consultation,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
