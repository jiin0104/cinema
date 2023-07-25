<template>
  <div>
    <div class="background">
      <br>
    <v-container class="header">
      wavecinema
    </v-container><br>
    <div class="maintext">당신을 위한<br>영화를 찾아드립니다</div><br>
    <button class="click">click !</button>
    <br><br><br>
 <div class="infotext">지금 상영중인 추천 영화</div>   
 <!--이미지슬라이더-->   
 <div class="slider">
 <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows="hover"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        img :src="img[i]"
        height="100%"
      >
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
          'al.jpg',
          
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

.background{
  background-size:cover;
  background-image:url("./main.jpg");
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  overflow: hidden;
  margin:0;
}


.header{
  position: relative;
  left: 500px;
  font-size: 35px;
  color: white;
  font-family: 'Dokdo', cursive;
}

.maintext{
  font-size:75px;
  text-align: center;
  color:white;
  font-family:'Noto Serif KR', serif;
}

.click{
  height: 70px;
  width: 300px;
  box-shadow: 0px 0px 7px -2px #fff;
  border-radius: 9px;
  font-size: 38px;
  font-family: 'Black Han Sans', sans-serif;
  color: white;
  background-color: #3742FA;
}

.infotext{
  color:white;
  font-family: 'Black Han Sans', sans-serif;
  font-size:25px;
}

.slider{
margin:0 auto;
  width: 300px; 
  height: 500;
}

</style>

