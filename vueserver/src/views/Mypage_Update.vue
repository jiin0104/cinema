<template>
  <body class="background" style="height: 1400px;">
    <!-- 좌상단 로고 -->
    <form id="app2" @submit="checkForm" action="/mypage" method="post" novalidate="true">
      <div class="myuptitle">
        <div class="myupform" style="padding-top: 3%; padding-bottom: 3%; max-width: 465px;">
          <div class="myupform1">
            <div class="contact-text">
              <div class="title">내 정보 수정하기</div>

              <!-- <div class="field2" id="myup">
                                <span label for="email">이메일(아이디)</span><br>
                                <input id="email" class="email" type="text" role="textbox" placeholder="이메일을 입력해 주세요."
                                    name="email" v-model="email" />
                                <v-btn type="button" id="crosscheck" @click="validateEmail" variant="tonal"
                                    style="color: white; background-color: rgb(57, 103, 255); height: 30px; width: 75px;">중복
                                    확인</v-btn>
                                <br /><br />
                            </div> -->

              <div class="field2" id="sign">
                <span label for="nickname">닉네임</span><br />
                <input type="text" class="nickname" id="nickname" role="textbox" placeholder="닉네임을 입력해 주세요."
                  name="nickname" v-model="nickname" />
                <v-btn id="crosscheck" @click="validateNickname" variant="tonal"
                  style="color: white; background-color: rgb(57, 103, 255); height: 30px; width: 75px;">중복
                  확인</v-btn><br /><br />
              </div>

              <div class="field2">
                <span label for="password">비밀번호</span><br />
                <input class="userpw" id="password" type="password" role="textbox" placeholder="비밀번호를 입력해 주세요."
                  name="password" v-model="password" /><br /><br />
              </div>

              <div class="field2">
                <span label for="passwordCheck">비밀번호 재확인</span><br />
                <input class="userpw-confirm" id="passwordCheck" type="password" role="textbox" name="passwordCheck"
                  v-model="passwordCheck" placeholder="비밀번호를 입력해 주세요." /><br /><br />
              </div>

              <div class="field2 tel-number">
                <span label for="phone">휴대전화(-제외)</span>
                <div>
                  <input id="phone1" class="phone1" type="text" role="textbox" name="phone" placeholder="ex)00012345678"
                    v-model="phone" /><br /><br />
                </div>
              </div>

              <div class="field2">
                <span label for="address">주소</span><br />
                <input type="text" class="zonecode" id="zonecode" placeholder="우편번호" role="textbox" v-model="zonecode"
                  readonly />
                <v-btn @click="openPostcode" id="postcode" variant="tonal"
                  style="color: white; background-color: rgb(57, 103, 255); height: 30px; width: 105px;">우편번호
                  찾기</v-btn><br />
                <input type="text" class="roadAddress" placeholder="주소" role="textbox" v-model="roadAddress" readonly
                  style="width: 67%;" /><br>
                <input type="text" class="detailAddress" id="addressdetail" placeholder="상세주소" role="textbox"
                  v-model="detailAddress" style="width: 67%;" /><br /><br>
              </div>

              <div class="field2">
                <span label for="age">연령대</span><br />
                <label><input class="age" id="age0" type="radio" value="10대 미만" name="age" v-model="age">10대
                  미만</label>&nbsp;
                <label><input class="age" id="age1" type="radio" value="10대" name="age" v-model="age">10대</label>&nbsp;
                <label><input class="age" id="age2" type="radio" value="20대" name="age" v-model="age"
                    checked>20대</label>&nbsp;
                <label><input class="age" id="age3" type="radio" value="30대" name="age"
                    v-model="age">30대</label>&nbsp;<br>
                <label><input class="age" id="age4" type="radio" value="40대" name="age" v-model="age">40대</label>&nbsp;
                <label><input class="age" id="age5" type="radio" value="50대" name="age" v-model="age">50대</label>&nbsp;
                <label><input class="age" id="age6" type="radio" value="60대" name="age" v-model="age">60대</label>&nbsp;
                <label><input class="age" id="age7" type="radio" value="70대" name="age" v-model="age">70대
                  이상</label><br><br>
              </div>

              <div class="field2">
                <span label for="sex">성별</span><br>
                <label><input class="sex" id="sex1" type="radio" value="M" name="sex" v-model="sex"
                    checked>남</label>&nbsp;
                <label><input class="sex" id="sex2" type="radio" value="F" name="sex" v-model="sex">여</label><br><br>
              </div>

              <div class="field2">
                <span label for="genre">선호하는 장르</span><br />
                <label><input class="genre" id="genre1" type="radio" value="애니메이션" name="genre" v-model="genre"
                    checked>애니메이션</label>&nbsp;
                <label><input class="genre" id="genre2" type="radio" value="액션" name="genre"
                    v-model="genre">액션</label>&nbsp;
                <label><input class="genre" id="genre3" type="radio" value="로맨스" name="genre"
                    v-model="genre">로맨스</label>&nbsp;
                <label><input class="genre" id="genre4" type="radio" value="코미디" name="genre"
                    v-model="genre">코미디</label>&nbsp;<br>
                <label><input class="genre" id="genre5" type="radio" value="SF" name="genre"
                    v-model="genre">SF</label>&nbsp;
                <label><input class="genre" id="genre6" type="radio" value="판타지" name="genre"
                    v-model="genre">판타지</label>&nbsp;
                <label><input class="genre" id="genre7" type="radio" value="스릴러" name="genre"
                    v-model="genre">스릴러</label>&nbsp;
                <label><input class="genre" id="genre8" type="radio" value="다큐멘터리" name="genre"
                    v-model="genre">다큐멘터리</label><br>
                <label><input class="genre" id="genre9" type="radio" value="전쟁" name="genre"
                    v-model="genre">전쟁</label><br><br>
              </div>

              <p v-if="errors.length">


                <b>아래 항목을 확인해주세요</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error" style="color: red;">{{ error }}</li>
              </ul>
              </p>

              <div style="position: relative; text-align: center;" class="signUp">
                <input type="submit" id="addallow" value="수정" variant="tonal"
                  style="color: white; background-color: rgb(57, 103, 255); min-height: 30px; min-width: 75px;">
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
@import "../css/mypage_update.css";
</style>

<script>
import axios from 'axios';

export default {


  el: '#app2',
  data() {//인풋에서 받을 값들.
    return {
      errors: [],
      // email: null,
      phone: null,
      nickname: null,
      password: null,
      passwordCheck: null,
      zonecode: null,
      roadAddress: null,
      detailAddress: null,
      age: null,
      sex: null,
      genre: null,
      userid: this.$store.state.userId,
    }
  },

  created() {
    this.get_user();
    this.USER_NO = this.$route.query.USER_NO
  },

  methods: {
    async get_user() {
      let userget = await this.$api("/api/userin", { param: [this.$store.state.userId] });
      this.userget = userget[0];
      this.nickname = this.userget.USER_NICKNAME;
      this.password = this.userget.USER_PASSWORD;
      this.passwordCheck = this.userget.USER_PASSWORD;
      this.phone = this.userget.USER_TEL;
      this.roadAddress = this.userget.USER_ADDRESS1;
      this.detailAddress = this.userget.USER_ADDRESS2;
      this.age = this.userget.AGE;
      this.genre = this.userget.GENRE;
      this.sex = this.userget.SEX;

    },

    checkForm(e) {//회원가입 양식 확인
      e.preventDefault();
      this.errors = [];

      // if (!this.email) {
      //     this.errors.push("이메일은 필수입니다.");
      // } else if (!this.validEmail(this.email)) {
      //     this.errors.push("이메일 형식을 확인하세요.");
      // }

      if (!this.nickname) {
        this.errors.push("닉네임은 필수입니다.");
      }

      // if (!this.password) {
      //   this.errors.push("비밀번호는 4~12자리, 대문자, 소문자, 숫자, 특수문자를 입력해주세요");
      // } else if (!this.validPassword(this.password)) {
      //   this.errors.push("비밀번호 형식을 확인하세요.");
      // }

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


    // validEmail(email) {// 이메일 형식 유효성 검사 로직
    //     var re1 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    //     return re1.test(email);
    // },




    // validPassword(password) {// 비밀번호 형식 유효성 검사, 4~12자리, 숫자,대문자,소문자,특수문자 다 넣어야함
    //   var re3 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{4,12}$/
    //   return re3.test(password);
    // },




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
        // email: this.email,
        nickname: this.nickname,
        password: this.password,
        phone: this.phone,
        address1: this.roadAddress,
        address2: this.detailAddress,
        age: document.querySelector('input[name="age"]:checked').value,
        sex: document.querySelector('input[name="sex"]:checked').value,
        genre: document.querySelector('input[name="genre"]:checked').value,
        userid: this.$store.state.userId
      };


      axios.post('/mypage/mypage_update', formData)//서브밋한 값들을 받아서 서버에 전달.
        .then(response => {
          if (response.data.message) {

            alert(response.data.message);
            // 가입 완료 후 로그인 페이지로 리다이렉트
            location.href = "/mypage";
          } else {
            alert('정보 수정에 실패했습니다.');
            console.log(formData);
          }
        })
        .catch(error => {
          console.error('정보 수정 실패', error);
          alert('정보 수정 실패. 확인 후 다시 시도해 주세요');
        });
    },

    validateEmail() {
      const email = this.email;
      if (!email) {
        alert("이메일 항목을 작성해주세요");
        return;
      }

      axios.post('/auth/checkEmail', { email })
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

      axios.post('/auth/checkNickname', { nickname })
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
