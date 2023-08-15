<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="findlogtitle">
          <div class="findformtitle">비밀번호 찾기</div>
          <div class="findform">
            <div class="findform1">
              <div style="margin-top: 6px">
                <div class="findinputid">
                  <span class="label">아이디</span>
                  <input
                    class="findinput"
                    type="email"
                    name="username"
                    placeholder="아이디를 입력하세요"
                    required
                  />
                </div>
                <div class="findinputpw">
                  <span class="label">휴대폰번호</span><br>
                  <input
                    class="findtel"
                    type="text"
                    name="pass"
                    placeholder="휴대폰 번호를 입력하세요"
                    autocomplete="off"
                    required
                    v-model="phoneNumber"
                  />
                  <input type="submit" class="findinfotext2" id="subscribe" value="인증번호 받기" variant="tonal" href="#" style="text-align: center; color: white;
                      background-color: rgb(84, 97, 139);
                      height: 53px;
                      width: 125px;
                      margin-left: 15px;
                      "
                @click="sendNumber()" />
                <div class="group" style="margin-top: 5px;">
              <label for="pass" class="label">인증번호</label>
              <input id="pass" type="password" class="findinput" data-type="password" v-model="userInputVerificationCode" />
            </div>
                </div>

                <div style="margin-left: 365px">
                  <v-btn
                    class="findinfotext"
                    variant="tonal"
                    style="
                      color: white;
                      background-color: rgb(57, 103, 255);
                      height: 237px;
                      width: 105px;
                    " @click="findPw()"
                  >
                    확인
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";



export default {
  data() {
    return {
      phoneNumber: "",

      errorMessage: "", // 경고 메시지를 담을 변수
      email: "",
      password: "",
      verificationCode: "",
      userInputVerificationCode: "", // 사용자가 입력한 인증번호를 저장할 변수
    };
  },
  methods: {
    sendNumber() {
      const phoneNumber = this.phoneNumber; // 전화번호 입력 값
      console.log(phoneNumber);
      // 서버로의 API 요청
      axios
        .post("/auth/checkPhoneNumber", { phoneNumber })
        .then((response) => {
          const exists = response.data.exists;
          console.log(exists);

          if (exists) {
            // 전화번호가 존재하는 경우, 인증번호가 함께 응답으로 받음.
            this.verificationCode = response.data.verificationCode;
            console.log("인증번호:", this.verificationCode);
            alert("인증번호를 발송했습니다.");
          } else {
            // 전화번호가 존재하지 않는 경우: 경고창 표시
            alert("회원가입되지 않은 전화번호입니다.");
          }
        })
        .catch((error) => {
          console.error("전화번호 확인 요청에 실패했습니다.", error);
        });
    },

    async findPw() {

      console.log("인증번호:", this.verificationCode);
      console.log("유저가 입력한 인증번호:", this.userInputVerificationCode);

      // 사용자가 입력한 인증번호와 서버에서 받아온 인증번호가 일치하는지 확인
      if (String(this.verificationCode) === String(this.userInputVerificationCode)) {
        try {
          // 서버에 비밀번호를 요청하는 API 호출
          const response = await axios.post("/auth/Find_PW", {
            phoneNumber: this.phoneNumber,
          });
          console.log(this.phoneNumber);

          // 서버로부터 받은 비밀번호를 저장
          this.password = response.data.password;
          console.log(this.password);

          // Find_Pw_Result.vue로 리다이렉트하면서 params로 비밀번호 전달
          this.$router.push({ name: "Find_Result_Pw", params: { pw: this.password}});
        } catch (error) {
          console.error("비밀번호 요청에 실패했습니다.", error);
          this.errorMessage = "비밀번호 요청에 실패했습니다.";
        }
      } else {
        // 인증번호가 일치하지 않는 경우
        alert("인증번호를 확인해 주세요!");
      }
    },

  },
}
</script>

<style>
@import "../css/find_pw.css";
</style>
