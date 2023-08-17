<template>
  <div>
    <div class="background">
      <form class="bg2">
        <div class="logtitle">
          <div class="formtitle">아이디 찾기</div>
          <div class="form">
            <div class="findidform">
              <div style="margin-top: 45px; font-size: 25px">
                <div class="findid" v-if="id !== ''">
                  당신의 아이디는<br />{{ getMaskedUsername }} <br />입니다

                </div>
                <div class="findid" v-else>
                  가입되 아이디 없음
                </div>
                <div>
                  <v-btn
                    class="infotext"
                    variant="tonal"
                    style="
                      color: white;
                      background-color: rgb(57, 103, 255);
                      height: 50px;
                      width: 80px;
                      position: relative;
                      top: 30px;
                      left: 195px;
                    "
                  >
                    로그인
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
export default {
  data() {
    return {
      id: '', // id 값을 저장할 변수
      showPartial: false,


    };
  },
  computed: {
    getMaskedUsername() {
      // 아이디를 일부만 '*'로 가려주는 로직을 작성
      const lengthToShow = 11; // 보여질 아이디 길이 (예: 처음 3글자만 보여주기)
      const maskedCharacters = '*'.repeat(this.id.length - lengthToShow);
      return maskedCharacters + this.id.slice(-lengthToShow);
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    console.log('받은 id:', this.$route.params.id);

  },
};
</script>



<style>
@import "../css/login.css";
</style>
