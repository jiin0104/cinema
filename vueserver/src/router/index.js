import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Filtering from "../views/Filtering.vue";
import Login from "../components/Login.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
