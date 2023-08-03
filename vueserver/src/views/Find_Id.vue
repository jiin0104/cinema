<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">아이디 찾기</div>
          <div class="form">
            <div class="form1">
              <div style="margin-top: 45px; margin-left: 10px">
                <div class="inputid">
                  <span class="label">휴대폰번호</span>
                  <input id="user"
                  v-model="phoneNumber"
                    class="input"
                    type="text"
                    name="username"
                    placeholder="휴대폰 번호를 입력하세요"
                    required
                  />
                </div>

                <div style="margin-left: 365px">
                  <input type="submit"
                  id="addallow2"
                    class="button"
                    variant="tonal"
                    style="
                      color: white;
                      background-color: rgb(57, 103, 255);
                      height: 50px;
                      width: 80px;
                      margin-top: 23px;
                    " @click="findId()"
                    value="확인"
                  >
                    
                  
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
  data(){
    return {
      phoneNumber: "",
      id: "",
      errorMessage: "", // 경고 메시지를 담을 변수
      email: "",
    }
  },
  methods: {
    async findId() {
      // 서버에 아이디 찾기 요청 보내기
      try {
        const response = await axios.post("/Find_Id", {
          phoneNumber: this.phoneNumber,
        });
        const { id } = response.data;

        if (id) {
          this.id = id;
          this.errorMessage = "";
          this.$router.push({ name: "find_result_id", params: { id } }); // 아이디가 있는 경우 find_id_result 페이지로 리다이렉트
          console.log(id); //정상적으로 서버에서 id값 받아오고 있는 거 확인 했음.
        } else {
          this.id = "";
          this.errorMessage = "가입된 아이디가 없습니다.";
          alert("가입된 아이디가 없습니다.");
          console.log(id); //정상적으로 서버에서 id값 받아오고 있는 거 확인
        }
      } catch (error) {
        console.error(error);
      }
    },
  }
}

</script>

<style>
@import "../css/login.css";
</style>
