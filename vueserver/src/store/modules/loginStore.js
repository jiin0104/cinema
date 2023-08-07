const loginStore = {
  state: {
    access_token: '',
    refresh_token: '',
  },
  getters: {},
  mutations: {
   //Mutation을 통해서만 State를 변경. 함수작성. Mutations에 접근하는 것은 Component의 Methods 영역내에서 가능. 기본 접근 방법: this.$store.commit('경로명/함수명')
   // 저장된 유저 정보와 불러온 유저 정보가 일치하는지 확인
  localUser(state, payload) {
    state.access_token = payload.access_token;
    state.refresh_token = payload.refresh_token;
  },
},
  actions: {},
}

export default loginStore