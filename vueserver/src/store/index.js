import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    //공통으로 참조하기 위한 변수를 정의. State에 접근하는 것은 Component의 computed 영역내에서 가능. 기본 접근 방법: this.$store.state.items
    return {
      userId: '',
      access_token: '',
      refresh_token: '',
    };
  },
  mutations: {
      //Mutation을 통해서만 State를 변경. 함수작성. Mutations에 접근하는 것은 Component의 Methods 영역내에서 가능. 기본 접근 방법: this.$store.commit('경로명/함수명')
   // 저장된 유저 정보와 불러온 유저 정보가 일치하는지 확인
  localUser(state, payload) {
    state.userId = payload.userId;
    state.access_token = payload.access_token;
    state.refresh_token = payload.refresh_token;
    localStorage.access_token = payload.access_token;
  },
  loginSuccess(state) {
    state.isLogin = true
    state.isLoginError = false
  },
  logOut(state) {
    state.isLogin = false
    state.isLoginError = false
  },
  loginError(state) {
    state.isLogin = false
    state.isLoginError = true
  },
  },

  plugins: [
    createPersistedState()
  ]
});

export default store;