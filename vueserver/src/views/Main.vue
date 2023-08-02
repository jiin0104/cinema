<template>
  <div>
    <div class="background">
      <div class="maintext">당신을 위한<br />영화를 찾아드립니다</div>
      <br />
      <div style="width: 370px; margin: 0 auto">
        <button class="click" @click="pageLink">click !</button>
      </div>
      <br /><br /><br />
      <div class="infotext">지금 상영중인 추천 영화</div>
      <!--이미지슬라이더-->
      <div class="slider">
        <v-container>
          <v-col>
            <v-carousel v-model="model">
              <v-carousel-item>
                <v-row>
                  <v-col cols="3" v-for="(slide, i) in slides" :key="i">
                    <img
                      class="movie-img"
                      :src="slide.imgSrc"
                      style="width: 180px; height: 200px"
                    />
                  </v-col>
                </v-row>
              </v-carousel-item>
              <v-carousel-item>
                <v-row>
                  <v-col cols="3" v-for="(slid, j) in slides2" :key="j">
                    <img
                      class="movie-img"
                      :src="slid.imgSrc"
                      style="width: 180px; height: 200px"
                    />
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-container>
      </div>
      <!--슬라이더 끝-->
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      logo: "logo.png",
      model: 0,
      slides: [
        { name: "부산행", imgSrc: "/pu.jpg" },
        { name: "라라랜드", imgSrc: "/lalaland.jpg" },
        { name: "알라딘", imgSrc: "/al.jpg" },
        { name: "바빌론", imgSrc: "/va.jpg" },
      ],
      slides2: [
        { name: "알라딘", imgSrc: "/al.jpg" },
        { name: "바빌론", imgSrc: "/va.jpg" },
        { name: "부산행", imgSrc: "/pu.jpg" },
        { name: "라라랜드", imgSrc: "/lalaland.jpg" },
      ],
    };
  },
  methods: {
    pageLink() {
      this.$router.push({ path: "FilteringR" });
    },
  },
};
</script>
<style>
@import "../css/main.css";
</style>
