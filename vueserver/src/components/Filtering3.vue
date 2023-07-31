<template>
  <div>
    <div class="background">
      <!-- 좌상단 로고 -->
      <v-container class="header"> wavecinema </v-container><br />
      <div class="filter">
        <div class="title">선호하는 장르는?</div>
        <br /><br />
        <!--2차 선택창-->
        <div class="select">
          <br /><br />
          <div class="buttonlocation3">
            <button type="button" class="button4" style="font-size: 27px">
              애니메이션
            </button>
            <div>
              <button type="button" class="button4">액션</button>
            </div>
          </div>
          <div class="buttonlocation3">
            <div>
              <button type="button" class="button4">로맨스</button>
            </div>
            <div>
              <button type="button" class="button4">코미디</button>
            </div>
          </div>
          <div class="buttonlocation3">
            <div>
              <button type="button" class="button4">SF</button>
            </div>
            <div>
              <button type="button" class="button4">판타지</button>
            </div>
          </div>
          <div class="buttonlocation3">
            <div>
              <button type="button" class="button4">스릴러</button>
            </div>
            <div>
              <button type="button" class="button4" style="font-size: 27px">
                다큐멘터리
              </button>
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

.buttonlocation3 {
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

/* 3차 장르 선택창 */
.button4 {
  font-family: "Black Han Sans", sans-serif;
  font-size: 30px;
  width: 120px;
  height: 120px;
  background-color: #e22baf;
  border-radius: 60px;
  margin: 8px;
  float: left;
}
</style>
<script>
export default {
  data() {
    return {};
  },
};
</script>
