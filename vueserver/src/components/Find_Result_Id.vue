<template>
  <div>
    <div class="background">
      <!-- 좌상단 로고 -->
      <v-container class="header"> wavecinema </v-container><br />
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">아이디 찾기</div>
          <div class="form">
            <div class="findidform">
              <div style="margin-top: 45px; font-size: 25px">
                <div class="findid">
                  당신의 아이디는<br />USER_ID <br />입니다
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Dokdo&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Dokdo&display=swap");

@import "../css/login.css";

.findidform {
  width: 500px;
  height: 300px;
  background-color: #c8bdbd;
  margin: 0 auto;
  padding: 15px;
  border-radius: 1em;
}
.findid {
  font-family: "Black Han Sans", sans-serif;
  font-size: 25px;
  text-align: center;
}
</style>
