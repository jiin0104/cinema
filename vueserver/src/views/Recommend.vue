<template>
  <div>
    <div class="background">
      <!-- 좌상단 로고 -->
      <v-container class="header">
        wavecinema
        <img :src="logo" style="width: 40px; height: 40px" /> </v-container
      ><br />
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">당신에게 추천드리는 영화예요!</div>
          <div class="form"></div>
          <v-btn
            class="infotext"
            variant="tonal"
            style="
              color: white;
              background-color: rgb(57, 103, 255);
              height: 50px;
              width: 210px;
              margin: 20px;
            "
          >
            다시 추천받기
          </v-btn>
          <v-btn
            class="infotext"
            variant="tonal"
            style="
              color: white;
              background-color: rgb(57, 103, 255);
              height: 50px;
              width: 210px;
              margin: 20px;
            "
          >
            추천받은 목록보기
          </v-btn>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logo: "logo.png",
    };
  },
};
</script>

<style>
@import "../css/recommend.css";
</style>
