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
import mypage from "../views/MyPage.vue";
import mypage_update from "../views/Mypage_Update.vue";
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
    // meta: {
    //   roles: [false],
    // },
  },
  {
    path: "/FilteringR",
    name: "FilteringR",
    component: FilteringR,
    meta: {
      roles: [true],
    },
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
    meta: {
      roles: [true],
    },
  },
  {
    path: "/Recommend",
    name: "Recommend",
    component: Recommend,
    meta: {
      roles: [true],
    },
  },
  {
    path: "/UserRecommend",
    name: "UserRecommend",
    component: UserRecommend,
    meta: {
      roles: [true],
    },
  },
  {
    path: "/Find_Id",
    name: "Find_Id",
    component: Find_Id,
    meta: {
      roles: [true],
    },
  },
  {
    path: "/Find_Pw",
    name: "Find_Pw",
    component: Find_Pw,
    meta: {
      roles: [true],
    },
  },
  {
    path: "/Find_Result_Id:id",
    name: "find_result_id",
    component: Find_Result_Id,
    meta: {
      roles: [true],
    },
  },
  {
    path: "/Find_Result_Pw:pw",
    name: "Find_Result_Pw",
    component: Find_Result_Pw,
    meta: {
      roles: [true],
    },
  },
  {
    path: "/mypage",
    name: "mypage",
    component: mypage,
    meta: {
      roles: [true],
    },
  },
  {
    path: "/mypage_update",
    name: "mypage_update",
    component: mypage_update,
    meta: {
      roles: [true],
    },
  },
];

import store from "../store/";
import Swal from "sweetalert2";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 유저 접근 권한 설정
router.beforeEach((to, from, next) => {
  let roleStatus = store.state.isLogin; // 현재 로그인 상태를 가져옴

  // 특정 라우터에 대한 경로 및 권한 확인
  if (
    to.meta.roles &&
    !to.meta.roles.includes(roleStatus) &&
    to.path === "/login"
  ) {
    // 특정 라우터에 대한 알림 표시
    Swal.fire({
      icon: "warning",
      title: "이미 로그인 상태입니다.",
      confirmButtonText: "확인",
    }).then(() => {
      next({ path: "/" }); // 승인을 클릭하면 메인 페이지로 이동
    });
  } else if (to.meta.roles && !to.meta.roles.includes(roleStatus)) {
    // 나머지 라우터에 대한 권한 확인
    Swal.fire({
      icon: "warning",
      title: "로그인이 필요합니다.",
      text: "로그인하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "승인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        next({ path: "/login" }); // 승인을 클릭하면 회원가입 페이지로 이동
      } else {
        next({ path: "/" }); // 취소를 클릭하거나 권한이 없으면 메인 페이지로 이동
      }
    });
  } else {
    next(); // 권한이 맞으면 그대로 페이지로 이동
  }
});

export default router;
