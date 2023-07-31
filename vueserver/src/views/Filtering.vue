<template>
  <div>
    <div class="background">
      <!-- 좌상단 로고 -->
      <v-container class="header"> wavecinema </v-container><br />
      <div class="filter">
        <div class="title">당신의 성별을 알려주세요!</div>
        <br /><br />
        <!--1차 선택창-->
        <div class="select">
          <div class="buttonlocation">
            <button type="button" class="button1">
              <img :src="buttonImage1" style="width: 100px; height: 100px" />
            </button>
            <div class="s-text">여성</div>
            <div>
              <button type="button" class="button2">
                <img :src="buttonImage2" style="width: 100px; height: 100px" />
              </button>
              <div class="s-text">남성</div>
            </div>
          </div>
        </div>
        <!--1차 선택창 끝-->
      </div>
    </div>
  </div>
</template>

<style>
@import "../css/filtering.css";
</style>

<script>
export default {
  data() {
    return {
      buttonImage1: "woman.png",
      buttonImage2: "man.png",
    };
  },
};
</script>
