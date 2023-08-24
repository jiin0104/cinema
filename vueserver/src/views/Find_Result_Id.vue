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
                  당신의 아이디는<br />{{ id }} <br />입니다

                </div>
                <div class="findid" v-else>
                  가입되 아이디 없음
                </div>
                <div>
                  <v-btn
                    @click="$router.push('/login')"
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
  },
  mounted() {
    this.id = this.$route.params.id;
  },
};
</script>



<style>
@import "../css/login.css";
</style>
