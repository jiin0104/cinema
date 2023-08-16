<template>
  <div>
    <div class="background">
      <div class="maintext">당신을 위한<br />영화를 찾아드립니다</div>
      <br />
      <div style="width: 370px; margin: 0 auto">
        <button class="click" @click="pageLink">click !</button>
      </div>
      <br /><br /><br />
      <div v-if="!this.$store.state.isLogin">
        <div class="infotext">지금 상영중인 추천 영화</div>
        <!--이미지슬라이더-->
        <div>
          <swiper :modules="modules" :slidesPerView="4" :centeredSlides="false" :spaceBetween="30" :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }" :navigation="true" :virtual="true" class="mySwiper" @swiper="setSwiperRef">
            <swiper-slide v-for="(po, index) in slides" :key="po" :virtualIndex="index"><img
                :src="`/download/${po.MOVIE_POSTER}`" /></swiper-slide>
          </swiper>
          <p class="append-buttons">
            <button @click="prepend()" class="prepend-2-slides"></button>
          </p>
        </div>
        <div class="infotext">인기 영화</div>
        <!--이미지슬라이더-->
        <div>
          <swiper :modules="modules" :slidesPerView="4" :centeredSlides="false" :spaceBetween="30" :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }" :navigation="true" :virtual="true" class="mySwiper" @swiper="setSwiperRef">
            <swiper-slide v-for="(po, index) in slides3" :key="po" :virtualIndex="index"><img
                :src="`/download/${po.MOVIE_POSTER}`" /></swiper-slide>
          </swiper>
          <p class="append-buttons">
            <button @click="prepend()" class="prepend-2-slides"></button>
          </p>
        </div>
      </div>

      <div v-else-if="this.$store.state.isLogin">
        <div class="infotext">내가 관심있는 장르 영화</div>
        <!--이미지슬라이더-->
        <div>
          <swiper :modules="modules" :slidesPerView="4" :centeredSlides="false" :spaceBetween="30" :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }" :navigation="true" :virtual="true" class="mySwiper" @swiper="setSwiperRef">
            <swiper-slide v-for="(po, index) in slides2" :key="po" :virtualIndex="index"><img
                :src="`/download/${po.MOVIE_POSTER}`" /></swiper-slide>
          </swiper>
          <p class="append-buttons">
            <button @click="prepend()" class="prepend-2-slides"></button>
          </p>
        </div>
        <div class="infotext">인기 영화</div>
        <!--이미지슬라이더-->
        <div>
          <swiper :modules="modules" :slidesPerView="4" :centeredSlides="false" :spaceBetween="30" :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }" :navigation="true" :virtual="true" class="mySwiper" @swiper="setSwiperRef">
            <swiper-slide v-for="(po, index) in slides3" :key="po" :virtualIndex="index"><img
                :src="`/download/${po.MOVIE_POSTER}`" /></swiper-slide>
          </swiper>
          <p class="append-buttons">
            <button @click="prepend()" class="prepend-2-slides"></button>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue"; //스와이퍼 불러오기

import "swiper/css"; //스와이퍼 css

import "swiper/css/navigation";
import "swiper/css/virtual";

// 스와이퍼 핵심모듈 물러오기
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
      slides: [],
      slides2: [],
      slides3: [],
    };
  },

  created() {
    //페이지 로딩 되자마자 메인 슬라이드 정보 가져오는 함수 호출
    this.getmain();
    this.getmain2();
    this.getmain3();
  },
  methods: {
    async getmain() {
      //슬라이드 정보 가져오는 api
      this.slides = await this.$api("/api/getmain", {});
      console.log(this.slides);
      console.log();
    },
    async getmain2(){
      this.slides2 = await this.$api("/api/getmain2", {param: [this.$store.state.userId, this.$store.state.userId, this.$store.state.userId, this.$store.state.userId]});
      console.log(this.slides2);
      console.log();
    },
    async getmain3() {
      //슬라이드 정보 가져오는 api
      this.slides3 = await this.$api("/api/getmain3", {});
      console.log(this.slides3);
      console.log();
    },
    pageLink() {
      //필터링 페이지로 이동
      this.$router.push({ path: "FilteringR" });
    },
  },
  setup() {
    //슬라이드 데이터 배열 생성
    const slides = ref(
      Array.from({ length: 10 }).map((_, index) => `Slide ${index + 1}`)
    );
    let swiperRef = null; //데이터 초기화
    let appendNumber = 10;
    let prependNumber = 1;

    //스와이퍼 참조 설정 함수
    const setSwiperRef = (swiper) => {
      swiperRef = swiper;
    };
    //슬라이더 이동 함수
    const slideTo = (index) => {
      swiperRef.slideTo(index - 1, 0);
    };
    const append = () => {
      //슬라이드 추가 함수
      slides.value = [...slides.value, "Slide " + ++appendNumber];
    };
    const prepend = () => {
      //슬라이드 앞에 추가하는 함수
      slides.value = [
        `Slide ${prependNumber - 2}`,
        `Slide ${prependNumber - 1}`,
        ...slides.value,
      ];
      prependNumber -= 2;
      swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
    };
    return {
      //스와이퍼 모듈 설정
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
