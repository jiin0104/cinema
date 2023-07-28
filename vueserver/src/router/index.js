import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Filtering from "../components/Filtering.vue";
import Filtering2 from "../components/Filtering2.vue";
import Login from "../components/Login.vue";
import Signup from "../views/Signup.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/Filtering",
    name: "Filtering",
    component: Filtering,
  },
  {
    path: "/Filtering2",
    name: "Filtering2",
    component: Filtering2,
  },
  {
    path: "/Signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
