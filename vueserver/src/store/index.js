import { createStore } from 'vuex'
// 로그인 모듈 import
import loginStore from '@/store/modules/loginStore.js'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    //공통으로 참조하기 위한 변수를 정의. State에 접근하는 것은 Component의 computed 영역내에서 가능. 기본 접근 방법: this.$store.state.items
    return {
    };
  },
  mutations: {
  },
  modules: {
    loginStore: loginStore
  },

  plugins: [
    createPersistedState()
  ]
});

export default store;