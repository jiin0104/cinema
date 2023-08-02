<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">로그인 후 추천받은 목록을 기록해보세요!</div>
          <div class="form">
            <div class="form1">
              <div style="margin-top: 6px;">
                <div class="inputid">
                  <span class="label">아이디</span>
                  <input v-model="id" class="input" type="email" name="username" placeholder="이메일을 입력하세요" required />
                </div>
                <div class="inputpw">
                  <span class="label">비밀번호</span>
                  <input v-model="password" class="input" type="password" name="pass" placeholder="비밀번호를 입력하세요" autocomplete="off"
                    required />
                </div>
                <div style="margin-left: 365px;">
                  <v-btn @click="login" class="infotext" variant="tonal"
                    style="color: white; background-color: rgb(57, 103, 255); height: 160px; width: 105px;">
                    확인
                  </v-btn>
                </div>
              </div>
            </div>
            <div class="form2">
              <v-btn class="infotext" variant="text" style="color: white;" @click="findid">
                아이디찾기
              </v-btn>
              <v-btn class="infotext" variant="text" style="color: white;" @click="findpw">
                비밀번호찾기
              </v-btn>
              <v-btn class="infotext" variant="text" style="color: white;" @click="signup">
                회원가입
              </v-btn>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@import "../css/login.css";
</style>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data: () => ({
    id: '',
    password: '',
  }),
  methods: {
    login(){
      axios ({
        url: "/api/login",
        method: "POST",
        data: {
          id: this.id,
          password: this.password
        }
      })
      .then(res => {
      console.log(res.data.message);
      // 서버에서 받아오는 로그인 정보
      if(res.data.message == 'undefined_id') {
        this.$swal("아이디 혹은 비밀번호가 맞지 않습니다.")
      }
      else if (res.data.message == 'incorrect_pw') {
        this.$swal("아이디 혹은 비밀번호가 맞지 않습니다.")
      }
      else {
        // store로 유저 정보 넘김
        this.$store.commit("localUser", { userId: this.userId, userNo: res.data.message })
        this.$swal("로그인 성공!")
          this.$router.push({path:'/'}); // 메인 컴포넌트 이동
          this.$store.commit('loginSuccess') // isLogin 상태 변환
      }
    })
    .catch(err => {
      console.log(err);
      this.$swal("아이디 및 비밀번호를 입력해주세요.")
    })

    },
    findid(){
      location.href = "/Find_Id";
    },
    findpw(){
      location.href = "/Find_Pw";
    },
    signup(){
      location.href = "/Signup";
    },
  }
}

</script>