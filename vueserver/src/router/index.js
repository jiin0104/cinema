//#region **import 모음**
import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import FinalFilter from "../views/FinalFilter.vue";
import Recommend from "../views/Recommend.vue";
import UserRecommend from "../views/UserRecommend.vue";
import Find_Id from "../views/Find_Id.vue";
import Find_Pw from "../views/Find_Pw.vue";
import Find_Result_Id from "../views/Find_Result_Id.vue";
import Find_Result_Pw from "../views/Find_Result_Pw.vue";
import FilteringR from "../views/FilteringR.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import filtertest from "../views/filtertest.vue";
import mypage from "../views/MyPage.vue"
import mypage_update from "../views/Mypage_Update.vue"
//#endregion

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
    path: "/FilteringR",
    name: "FilteringR",
    component: FilteringR,
    meta: {

    }
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
    path: "/Find_Result_Id:id",
    name: "find_result_id",
    component: Find_Result_Id,
  },
  {
    path: "/Find_Result_Pw:pw",
    name: "Find_Result_Pw",
    component: Find_Result_Pw,
  },
  {
    path: "/filtertest",
    name: "filtertest",
    component: filtertest,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: mypage,
  },
  {
    path: "/mypage_update",
    name: "mypage_update",
    component: mypage_update,
  },
];

import store from '../store/'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
