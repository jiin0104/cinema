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
          <br />
          <div class="buttonlocation4">
            <button type="button" class="button5">
              <img :src="emoji1" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">사랑중이예요</div>
            <div>
              <button type="button" class="button5">
                <img :src="emoji2" style="width: 90px; height: 90px" />
              </button>
              <div class="s-text">우울해요</div>
            </div>
          </div>
          <div class="buttonlocation4">
            <button type="button" class="button5">
              <img :src="emoji3" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">이별했어요&nbsp;&nbsp;</div>
            <div>
              <button type="button" class="button5">
                <img :src="emoji4" style="width: 90px; height: 90px" />
              </button>
              <div class="s-text">고민있어요</div>
            </div>
          </div>
          <div class="buttonlocation4">
            <button type="button" class="button5">
              <img :src="emoji5" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">행복해요&nbsp;&nbsp;&nbsp;</div>
            <div>
              <button type="button" class="button5">
                <img :src="emoji6" style="width: 90px; height: 90px" />
              </button>
              <div class="s-text">심심해요</div>
            </div>
          </div>
          <div class="buttonlocation4">
            <button type="button" class="button5">
              <img :src="emoji7" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">
              떠나고<br />싶어요&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
            </div>
            <div>
              <button type="button" class="button5">
                <img :src="emoji8" style="width: 90px; height: 90px" />
              </button>
              <div class="s-text">화나요</div>
            </div>
          </div>
          <div class="buttonlocation4">
            <button type="button" class="button5">
              <img :src="emoji9" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">힐링이<br />필요해요&nbsp;&nbsp;&nbsp;</div>
            <div>
              <button type="button" class="button5">
                <img :src="emoji10" style="width: 90px; height: 90px" />
              </button>
              <div class="s-text">배고파요</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--1차 선택창 끝-->
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

.buttonlocation4 {
  position: relative;
  left: 10px;
  display: flex;
}

.s-text {
  font-family: "Black Han Sans", sans-serif;
  font-size: 30px;
  float: left;
  position: relative;
  top: 30px;
  color: white;
}

.button5 {
  width: 90px;
  height: 90px;
  border-radius: 50px;
  margin: 8px;
  float: left;
}
</style>
<script>
export default {
  data() {
    return {
      emoji1: "love.png",
      emoji2: "sad.png",
      emoji3: "crying.png",
      emoji4: "thinking.png",
      emoji5: "smiling.png",
      emoji6: "musical-note.png",
      emoji7: "plane.png",
      emoji8: "angry.png",
      emoji9: "cat.png",
      emoji10: "tongue.png",
    };
  },
};
</script>
