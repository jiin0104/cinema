import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"; // 새로고침 시에도 로그인을 상태 정보를 초기화하지 않게 해주는 모듈

const store = createStore({
  state() {
    //공통으로 참조하기 위한 변수를 정의. State에 접근하는 것은 Component의 computed 영역내에서 가능. 기본 접근 방법: this.$store.state.items
    return {
      userId: "",
      userNo: "",
    };
  },
  mutations: {
    //Mutation을 통해서만 State를 변경. 함수작성. Mutations에 접근하는 것은 Component의 Methods 영역내에서 가능. 기본 접근 방법: this.$store.commit('경로명/함수명')
    // 저장된 유저 정보와 불러온 유저 정보가 일치하는지 확인
    localUser(state, payload) {
      state.userId = payload.userId;
      state.userNo = payload.userNo;
    },
    // 로그인 성공 시 상태 변화
    loginSuccess(state) {
      state.isLogin = true;
      state.isLoginError = false;
    },
    // 로그아웃 시 상태 변화
    logOut(state) {
      state.isLogin = false;
      state.isLoginError = false;
    },
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
  },
  plugins: [createPersistedState()],
});

export default store;
