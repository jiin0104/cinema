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
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
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
@import url("https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Dokdo&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Dokdo&display=swap");

.title {
  text-align: center;
  font-size: 50px;
  color: white;
  font-family: "Black Han Sans", sans-serif;
}

.select {
  width: 500px;
  height: 600px;
  background-color: #ffffff5b;
  margin: 0 auto;
  border-radius: 1em;
}

.buttonlocation {
  position: relative;
  left: 95px;
}

.s-text {
  font-family: "Black Han Sans", sans-serif;
  font-size: 30px;
  float: left;
  position: relative;
  top: 30px;
  color: white;
}

.button1 {
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50px;
  margin: 8px;
  float: left;
}

.button2 {
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50px;
  margin: 8px;
  float: left;
}
</style>

<script>
export default {
  data() {
    return {
      buttonImage1: "../asset/woman.png",
      buttonImage2: "../asset/man.png",
    };
  },
};
</script>
