<template>
  <div style="overflow:auto" >
    <div class="background">
      <br>
      <v-container class="header">
        wavecinema
      </v-container><br>
      <div class="maintext">당신을 위한<br>영화를 찾아드립니다</div><br>
      <div style="width: 370px; margin:0 auto;"><button class="click">click !</button></div>
      <br><br><br>
      <div class="infotext">지금 상영중인 추천 영화</div>
      <!--이미지슬라이더-->
      <div class="slider">
        <v-carousel cycle height="400" hide-delimiter-background show-arrows="hover">
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet img :src="img[i]" height="100%">
              <div class="d-flex fill-height justify-center align-center">
                <div class="text-h2">
                  {{ slide }}
                </div>
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      img: [
        '../assets/al.jpg',

      ],
      slides: [
        '스타이즈본',
        '알라딘',
        '라라랜드',
        '바빌론',
        '바비',
      ],

    };
  },

}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Dokdo&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Dokdo&display=swap');

@import "../css/main.css";
</style>

