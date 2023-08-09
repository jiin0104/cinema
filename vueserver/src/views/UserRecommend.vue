<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="Recommendtitle">
            {{ userinfo.USER_NICKNAME }} 님이 추천받은 영화 목록이에요!
          </div>
          <div class="formlist">

          </div>

          <v-btn
            class="infotext"
            variant="tonal"
            style="
              color: white;
              background-color: rgb(57, 103, 255);
              height: 50px;
              width: 210px;
              position: relative;
              left: 500px;
            "
            @click="pageLink"
          >
            다시 추천받기
          </v-btn>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000"; //프록시 서버
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  data() {
    return {
      userinfo: {},
      logo: "logo.png",
    };
  },
  created() {
    this.Get_user();
  },
  methods: {
    pageLink() {
      //클릭시 메인으로 이동
      this.$router.push({ path: "/" });
    },
    async Get_user() {
      let userinfo = await this.$api("/api/userin", { param: [this.$store.state.userId] });
      this.userinfo = userinfo[0];
    }
  },
};
</script>

<style>
@import "../css/userecommend.css";
</style>
