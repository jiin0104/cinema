<template>
  <div>
    <div class="background">
      <form id="app3" class="bg2" @submit="checkForm" action="/login" method="post" novalidate="true">
        <div class="uppwlogtitle">
          <div class="uppwformtitle">비밀번호 재설정</div>
          <div class="form">
            <div class="uppwform">
              <div style="margin-top: 20px; font-size: 25px">
                <div class="uppwinputpw">
                  <span label for="password">새로운 비밀번호</span>
                  <input class="uppwinput" id="password" type="password" name="pass" placeholder="비밀번호를 입력하세요" autocomplete="off" required
                    v-model="password" />
                </div>
                <div class="uppwinputpw">
                  <span label for="password">새로운 비밀번호 확인</span>
                  <input class="uppwinput" id="passwordCheck" type="password" name="pass" placeholder="비밀번호를 입력하세요" autocomplete="off" required
                    v-model="passwordCheck" />
                </div>

                

                <div>
                  <input type="submit"
                  id="addallow"
                    class="infotext"
                    value="변경"
                    variant="tonal"
                    style="
                      color: white;
                      background-color: rgb(57, 103, 255);
                      height: 50px;
                      width: 80px;
                      position: relative;
                      top: 137px;
                      margin: 10px;
                    "
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
import axios from 'axios';

export default {
  el: "#app3",
  data() {
    return {
      errors: [],
      password: null,
      passwordCheck: null,
      stpw: this.$route.params.pw,
    }
  },


  methods: {
    //빈칸 있을시 나타나는 오류메세지 
    checkForm(e) {
      e.preventDefault();
      this.errors = [];
      
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

      if (!this.errors.length) {
        this.submitForm();
      }
    },

    


    // 비밀번호 형식 유효성 검사
    validPassword(password) {
      var re3 = /^[A-Za-z0-9]{4,12}$/
      return re3.test(password);
    },

    //비밀번호 일치 검사
    validPasswordCheck: function () {
      let pw = document.getElementById("password").value
      let pwcheck = document.getElementById("passwordCheck").value

      if (pw !== pwcheck) {
        alert("비밀번호가 맞지않습니다")
      } else {
        return true;
      }
    },

    //입력한 값들 서브밋
    submitForm() {
      
      console.log(this.$route.params.pw);
      const formData = {
        
        password: this.password,
        stpw: this.$route.params.pw,
      };

      //서브밋한 값들을 받아서 서버에 전달.
      axios.post('/pw_update', formData)
        .then(response => {
          if (response.data.message) {
            alert(response.data.message);
            location.href = "/Login";

          } else {
            alert('비밀번호 수정에 실패했습니다.');
            console.log(formData);
          }
        })
        .catch(error => {
          console.error('비밀번호 수정 실패', error);
          alert('비밀번호 수정 실패. 확인 후 다시 시도해 주세요');
        });
    },
  }
}



</script>


<style>
@import "../css/updatepw.css";
</style>
