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
                  <input v-model="userId" class="input" type="email" name="username" placeholder="이메일을 입력하세요" required />
                </div>
                <div class="inputpw">
                  <span class="label">비밀번호</span>
                  <input v-model="userPw" class="input" type="password" name="pass" placeholder="비밀번호를 입력하세요"
                    autocomplete="off" required />
                </div>
                <div style="margin-left: 365px;">
                  <v-btn type="submit" @click="login" class="infotext" variant="tonal"
                    style="color: white; background-color: rgb(57, 103, 255); height: 160px; width: 105px;">
                    로그인
                  </v-btn>
                </div>
              </div>
            </div>
            <div class="form2">
              <v-btn class="infotext" variant="text" style="color: white;" @click="$router.push('/find_id')">
                아이디찾기
              </v-btn>
              <v-btn class="infotext" variant="text" style="color: white;" @click="$router.push('/find_pw')">
                비밀번호찾기
              </v-btn>
              <v-btn class="infotext" variant="text" style="color: white;" @click="$router.push('/signup')">
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
import Swal from 'sweetalert2';

// cors 정책 관련
axios.defaults.baseURL = 'http://localhost:3000'; //서버주소
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
  name: 'Login',
  data() {
    return {
      // 유저 입력 데이터
      userId: '',
      userPw: '',
    };
  },
  methods: {
    // 로그인 함수
    login() {
      axios({
        url: "/auth/login",
        method: 'POST',
        data: {
          // post 방식으로 서버에 유저 입력 데이터 전송
          userId: this.userId,
          userPw: this.userPw
        }
      })
        .then(res => {
          console.log(res.data.message);
          // 서버에서 받아오는 로그인 정보
          if (res.data.message == 'undefined_id') {
            Swal.fire({
              icon: 'warning',
              title: '아이디 혹은 비밀번호를 \n 확인해주세요.',
            });
          }
          else if (res.data.message == 'incorrect_pw') {
            Swal.fire({
              icon: 'warning',
              title: '아이디 혹은 비밀번호를 \n 확인해주세요.',
            });
          }
          else {
            // store로 유저 정보 넘김
            this.$store.commit("localUser", { userId: this.userId, userNo: res.data.message1 })
            Swal.fire({
              icon: 'success',
              title: '로그인 성공!',
            });
            this.$router.push({ path: '/' }); // 메인 컴포넌트 이동
            this.$store.commit('loginSuccess') // isLogin 상태 변환
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}

</script>