<template>
  <div>
    <div class="background">
      <!-- 좌상단 로고 -->
      <v-container class="header"> wavecinema </v-container><br />
      <div class="filter">
        <div class="title">연령대는?</div>
        <br /><br />
        <!--2차 선택창-->
        <div class="select">
          <br /><br />
          <div class="buttonlocation1">
            <button type="button" class="button3">어린이</button>
            <div>
              <button type="button" class="button3">10대</button>
            </div>
          </div>
          <div class="buttonlocation1">
            <div>
              <button type="button" class="button3">20대</button>
            </div>
            <div>
              <button type="button" class="button3">30대</button>
            </div>
          </div>
          <div class="buttonlocation1">
            <div>
              <button type="button" class="button3">40대</button>
            </div>
            <div>
              <button type="button" class="button3">50대</button>
            </div>
          </div>
          <div class="buttonlocation1">
            <div>
              <button type="button" class="button3">60대</button>
            </div>
            <div>
              <button type="button" class="button3">70대+</button>
            </div>
          </div>
        </div>
      </div>
      <!--2차 선택창 끝-->
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

.buttonlocation1 {
  display: inline;
}

.s-text {
  font-family: "Black Han Sans", sans-serif;
  font-size: 30px;
  float: left;
  position: relative;
  top: 30px;
  color: white;
}

/* 2차 선택창 */
.button3 {
  font-family: "Black Han Sans", sans-serif;
  font-size: 30px;
  width: 120px;
  height: 120px;
  background-color: #4acfd2;
  border-radius: 60px;
  margin: 8px;
  float: left;
}
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
