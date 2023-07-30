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
          <div class="Recommendtitle">
            USER_NICKNAME 님이 추천받은 영화 목록이예요!
          </div>
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

.form {
  height: 400px;
  margin: 0 auto;
  border-radius: 1em;
}

.logtitle {
  width: 1500px;
  height: 800px;
  background-color: #ffffff5b;
  border-radius: 1em;
}

.Recommendtitle {
  color: white;
  font-family: "Black Han Sans", sans-serif;
  font-size: 50px;
}
</style>
