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
      <div>
        <swiper
          :modules="modules"
          :slidesPerView="3"
          :centeredSlides="false"
          :spaceBetween="30"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }"
          :navigation="true"
          :virtual="true"
          class="mySwiper"
          @swiper="setSwiperRef"
        >
          <swiper-slide
            v-for="(po, index) in slides"
            :key="po"
            :virtualIndex="index"
            ><img src="https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
          /></swiper-slide>
        </swiper>
        <p class="append-buttons">
          <button @click="prepend()" class="prepend-2-slides"></button>
        </p>
      </div>
      <!-- <div class="slider">
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
      </div> -->
      <!--슬라이더 끝-->
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/virtual";

// import Swiper core and required modules
import { Autoplay, Pagination, Navigation, Virtual } from "swiper/modules";
export default {
  name: "",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      logo: "logo.png",
      // model: 0,
      // slides: [
      //   { name: "부산행", imgSrc: "/pu.jpg" },
      //   { name: "라라랜드", imgSrc: "/lalaland.jpg" },
      //   { name: "알라딘", imgSrc: "/al.jpg" },
      //   { name: "바빌론", imgSrc: "/va.jpg" },
      // ],
      // slides2: [
      //   { name: "알라딘", imgSrc: "/al.jpg" },
      //   { name: "바빌론", imgSrc: "/va.jpg" },
      //   { name: "부산행", imgSrc: "/pu.jpg" },
      //   { name: "라라랜드", imgSrc: "/lalaland.jpg" },
      // ],
      slides: [],
    };
  },

  created() {
    this.getmain();
  },
  methods: {
    async getmain(){
      this.slides = await this.$api("/api/getmain", {});
      console.log(this.slides);
    },
    pageLink() {
      this.$router.push({ path: "FilteringR" });
    },
  },
  setup() {
    // Create array with 10 slides
    const slides = ref(
      Array.from({ length: 10 }).map((_, index) => `Slide ${index + 1}`)
    );
    let swiperRef = null;
    let appendNumber = 10;
    let prependNumber = 1;

    const setSwiperRef = (swiper) => {
      swiperRef = swiper;
    };
    const slideTo = (index) => {
      swiperRef.slideTo(index - 1, 0);
    };
    const append = () => {
      slides.value = [...slides.value, "Slide " + ++appendNumber];
    };
    const prepend = () => {
      slides.value = [
        `Slide ${prependNumber - 2}`,
        `Slide ${prependNumber - 1}`,
        ...slides.value,
      ];
      prependNumber -= 2;
      swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
    };
    return {
      slides,
      swiperRef: null,
      appendNumber,
      prependNumber,
      setSwiperRef,
      slideTo,
      append,
      prepend,
      modules: [Autoplay, Pagination, Navigation, Virtual],
    };
  },
};
</script>
<style>
@import "../css/main.css";
@import "../css/swiper.css";
</style>
