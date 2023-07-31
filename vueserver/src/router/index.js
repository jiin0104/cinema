import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Filtering from "../components/Filtering.vue";
import Filtering2 from "../components/Filtering2.vue";
import Filtering3 from "../components/Filtering3.vue";
import Filtering4 from "../components/Filtering4.vue";
import FinalFilter from "../components/FinalFilter.vue";
import Recommend from "../components/Recommend.vue";
import UserRecommend from "../components/UserRecommend.vue";
import Find_Id from "../components/Find_Id.vue";
import Find_Pw from "../components/Find_Pw.vue";
import Find_Result_Id from "../components/Find_Result_Id.vue";
import Find_Result_Pw from "../components/Find_Result_Pw.vue";

import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";

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
  {
    path: "/Signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/FinalFilter",
    name: "FinalFilter",
    component: FinalFilter,
  },
  {
    path: "/Recommend",
    name: "Recommend",
    component: Recommend,
  },
  {
    path: "/UserRecommend",
    name: "UserRecommend",
    component: UserRecommend,
  },
  {
    path: "/Find_Id",
    name: "Find_Id",
    component: Find_Id,
  },
  {
    path: "/Find_Pw",
    name: "Find_Pw",
    component: Find_Pw,
  },
  {
    path: "/Find_Result_Id",
    name: "Find_Result_Id",
    component: Find_Result_Id,
  },
  {
    path: "/Find_Result_Pw",
    name: "Find_Result_Pw",
    component: Find_Result_Pw,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
