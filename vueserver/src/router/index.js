import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Filtering from "../views/Filtering.vue";
import Filtering2 from "../views/Filtering2.vue";
import Filtering3 from "../views/Filtering3.vue";
import Filtering4 from "../views/Filtering4.vue";
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
  {
    path: "/Filtering2",
    name: "Filtering2",
    component: Filtering2,
  },
  {
    path: "/Filtering3",
    name: "Filtering3",
    component: Filtering3,
  },
  {
    path: "/Filtering4",
    name: "Filtering4",
    component: Filtering4,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
