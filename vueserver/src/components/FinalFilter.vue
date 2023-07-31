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
          <div class="formtitle">당신을 분석중입니다</div>
          <div class="form"></div>
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
@import url("https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Dokdo&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Dokdo&display=swap");

@import "../css/filtering.css";
</style>
