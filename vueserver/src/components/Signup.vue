<template>
  <body class="background">
    <!-- 좌상단 로고 -->
    <v-container class="header">
      wavecinema
    </v-container><br>
    <form id="app2" @submit="checkForm" action="/signup" method="post" novalidate="true">
      <div class="signtitle">
        <div class="signform" style="padding-top: 6%; max-width: 465px;">
          <div class="signform1">
            <div class="contact-text">
              <div class="title">회원 가입</div>

              <div class="field2" id="sign">
                <b label for="email">이메일(아이디)</b><br>
                <input id="email" type="text" role="textbox" placeholder="이메일을 입력해 주세요." name="email" v-model="email" />
                <v-btn id="crosscheck" @click="validateEmail" variant="tonal"
                  style="color: white; background-color: rgb(57, 103, 255); height: 30px; width: 75px;">중복 확인</v-btn>
                <br /><br />
              </div>

              <div class="field2" id="sign">
                <b label for="nickname">닉네임</b><br />
                <input type="text" id="nickname" role="textbox" placeholder="닉네임을 입력해 주세요." name="nickname"
                  v-model="nickname" />
                <v-btn id="crosscheck" @click="validateNickname" variant="tonal"
                  style="color: white; background-color: rgb(57, 103, 255); height: 30px; width: 75px;">중복
                  확인</v-btn><br /><br />
              </div>

              <div class="field2">
                <b label for="password">비밀번호</b><br />
                <input class="userpw" id="password" type="password" role="textbox" placeholder="비밀번호를 입력해 주세요."
                  name="password" v-model="password" /><br /><br />
              </div>

              <div class="field2">
                <b label for="passwordCheck">비밀번호 재확인</b><br />
                <input class="userpw-confirm" id="passwordCheck" type="password" role="textbox" name="passwordCheck"
                  v-model="passwordCheck" placeholder="비밀번호를 입력해 주세요." /><br /><br />
              </div>

              <div class="field2 tel-number">
                <b label for="phone">휴대전화(-제외)</b>
                <div>
                  <input id="phone1" type="text" role="textbox" name="phone" placeholder="ex)00012345678"
                    v-model="phone" /><br /><br />
                </div>
              </div>

              <div class="field2">
                <b label for="address">주소</b><br />
                <input type="text" id="zonecode" placeholder="우편번호" role="textbox" v-model="zonecode" readonly />
                <v-btn @click="openPostcode" id="postcode" variant="tonal"
                  style="color: white; background-color: rgb(57, 103, 255); height: 30px; width: 105px;">우편번호 찾기</v-btn><br />
                <input type="text" placeholder="주소" role="textbox" v-model="roadAddress" readonly
                  style="width: 67%;" /><br />
                <input type="text" id="addressdetail" placeholder="상세주소" role="textbox" v-model="detailAddress"
                  style="width: 67%;" /><br /><br />
              </div>

              <div class="field2">
                <b label for="age">연령대</b><br />
                <input class="age" id="age" type="radio">
              </div>

              <p v-if="errors.length">
                <br>
                <b>아래 항목을 확인해주세요</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error" style="color: red;">{{ error }}</li>
              </ul>
              </p>

              <div style="position: relative; left: 125px; top: 30px" class="signUp">
                <input type="submit" id="addallow" value="가입하기" variant="tonal"
                  style="color: white; background-color: rgb(57, 103, 255); height: 30px; width: 75px;">
              </div>
            </div>
            </div>
          </div>
        </div>
        <div class="main" style="width: 20%"></div>
    </form>
  </body>
</template>

<style>


@import "../css/signup.css";
</style>

<script>
// import axios from 'axios';

export default {


  el: '#app2',
  data() {//인풋에서 받을 값들.
    return {
      errors: [],
      email: null,
      phone: null,
      nickname: null,
      password: null,
      passwordCheck: null,
      zonecode: null,
      roadAddress: null,
      detailAddress: null
    }
  },


  methods: {
    checkForm(e) {//회원가입 양식 확인
      e.preventDefault();
      this.errors = [];

      if (!this.email) {
        this.errors.push("이메일은 필수입니다.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("이메일 형식을 확인하세요.");
      }

      if (!this.nickname) {
        this.errors.push("닉네임은 필수입니다.");
      }

      if (!this.password) {
        this.errors.push("비밀번호는 4~12자리를 입력해주세요");
      } else if (!this.validPassword(this.password)) {
        this.errors.push("비밀번호 형식을 확인하세요.");
      }

      if (!this.passwordCheck) {
        this.errors.push("비밀번호를 확인해주세요");
      } else if (!this.validPasswordCheck(this.passwordCheck)) {
        this.errors.push("비밀번호를 확인해주세요")
      }

      if (!this.phone) {
        this.errors.push("전화번호는 필수입니다");
      } else if (!this.validPhone(this.phone)) {
        this.errors.push("전화번호 형식을 확인하세요.");
      }

      if (!this.roadAddress) {
        this.errors.push("주소는 필수입니다");
      }

      if (this.errors.length === 0) {
        this.submitForm();
      }
    },


    validEmail(email) {// 이메일 형식 유효성 검사 로직
      var re1 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return re1.test(email);
    },


    validPassword(password) {// 비밀번호 형식 유효성 검사 로직
      var re3 = /^[A-Za-z0-9]{4,12}$/
      return re3.test(password);
    },


    validPasswordCheck: function () {//비밀번호 일치 검사 로직
      let pw = document.getElementById("password").value
      let pwcheck = document.getElementById("passwordCheck").value

      if (pw !== pwcheck) {
        alert("비밀번호가 맞지않습니다")
      } else {
        return true;
      }
    },


    validNickname: function (nickname) {//닉네임 유효성 검사 로직
      var re0 = /^[A-Za-z가-힣]{1,6}$/
      return re0.test(nickname);
    },


    validPhone(phone) {// 전화번호 유효성 검사 로직
      var re2 = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/
      return re2.test(phone);
    },


    submitForm() {//입력한 값들 서브밋.
      const formData = {
        email: this.email,
        nickname: this.nickname,
        password: this.password,
        phone: this.phone,
        address1: this.roadAddress,
        address2: this.detailAddress
      };


      axios.post('/signup', formData)//서브밋한 값들을 받아서 서버에 전달.
        .then(response => {
          if (response.data.message) {
            alert(response.data.message);
            // 가입 완료 후 로그인 페이지로 리다이렉트
            location.href = "/login";
          } else {
            alert('회원 등록에 실패했습니다.');
            console.log(formData);
          }
        })
        .catch(error => {
          console.error('회원등록 실패', error);
          alert('회원등록 실패. 확인 후 다시 시도해 주세요');
        });
    },

    validateEmail() {
      const email = this.email;
      if (!email) {
        alert("이메일 항목을 작성해주세요");
        return;
      }

      axios.post('/checkEmail', { email })
        .then(response => {
          if (response.data.exists) {
            alert("이미 존재하는 이메일입니다.");
          } else {
            alert("사용 가능한 이메일입니다.");
          }
        })
        .catch(error => {
          console.error('이메일 중복 확인 실패', error);
          alert('이메일 중복 확인에 실패했습니다.');
        });
    },


    validateNickname() {
      const nickname = this.nickname;
      if (!nickname) {
        alert("닉네임 항목을 작성해주세요");
        return;
      }

      axios.post('/checkNickname', { nickname })
        .then(response => {
          if (response.data.exists) {
            alert("이미 존재하는 닉네임입니다.");
          } else {
            alert("사용 가능한 닉네임입니다.");
          }
        })
        .catch(error => {
          console.error('닉네임 중복 확인 실패', error);
          alert('닉네임 중복 확인에 실패했습니다.');
        });
    },


    openPostcode() {//주소찾기 로직
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.zonecode = data.zonecode;
          this.roadAddress = data.roadAddress;
        },
      }).open();
    },


  },
}
</script>
