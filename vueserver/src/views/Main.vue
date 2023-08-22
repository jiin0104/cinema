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
        <!--로그인 안했을때-->
        <div class="infotext">지금 상영중인 영화</div>
        <div>
          <swiper
            :modules="modules"
            :slidesPerView="4"
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
              ><img :src="`/download/${po.MOVIE_POSTER}`"
            /></swiper-slide>
          </swiper>
          <p class="append-buttons">
            <button @click="prepend()" class="prepend-2-slides"></button>
          </p>
        </div>
        <div class="infotext">인기 영화</div>
        <div>
          <swiper
            :modules="modules"
            :slidesPerView="4"
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
              v-for="(po, index) in slides3"
              :key="po"
              :virtualIndex="index"
              ><img :src="`/download/${po.MOVIE_POSTER}`"
            /></swiper-slide>
          </swiper>
          <p class="append-buttons">
            <button @click="prepend()" class="prepend-2-slides"></button>
          </p>
        </div>
      </div>
      <!--로그인 했을때-->
      <div v-else-if="this.$store.state.isLogin">
        <div class="infotext">내가 좋아할만한 영화</div>
        <div>
          <swiper
            :modules="modules"
            :slidesPerView="4"
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
              v-for="(po, index) in slides2"
              :key="po"
              :virtualIndex="index"
              ><img :src="`/download/${po.MOVIE_POSTER}`"
            /></swiper-slide>
          </swiper>
          <p class="append-buttons">
            <button @click="prepend()" class="prepend-2-slides"></button>
          </p>
        </div>
        <div class="infotext">인기 영화</div>
        <div>
          <swiper
            :modules="modules"
            :slidesPerView="4"
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
              v-for="(po, index) in slides3"
              :key="po"
              :virtualIndex="index"
              ><img :src="`/download/${po.MOVIE_POSTER}`"
            /></swiper-slide>
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
      slides: [], //지금 상영중인 영화 슬라이드
      slides2: [], //로그인시, 추천목록 유무에 따라 달라지는 슬라이드
      slides3: [], //인기 영화 슬라이드
    };
  },

  created() {
    //페이지 로딩 되자마자 메인 슬라이드 정보 가져오는 함수 호출
    this.getmain(); //지금 상영중인 영화 함수 호출
    this.getmain2(); //로그인시, 추천목록 유무 확인 함수 호출
    this.getmain3(); //인기 영화 함수 호출
  },
  methods: {
    async getmain() {
      // 지금 상영중인 영화 함수
      this.slides = await this.$api("/api/getmain", {});
      console.log("지금 상영중인 영화 함수", this.slides);
    },

    //이 함수는 밑의 로직 완성되면 없앨 함수!!!!!!!!!!(지금 임의로 쓰는중)
    // async getmain2() {
    //   // 회원가입시 선택한 장르 영화 함수
    //   this.slides2 = await this.$api("/api/getDefaultGenreMovies", {
    //     param: [this.$store.state.userId],
    //   });
    //   console.log("회원가입시 선택한 장르와 비슷한 영화:", this.slides2);
    // },

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    async getmain2() {
      const hasRecommendations = await this.checkRecommendations(); // 추천 목록의 유무 확인
      console.log("함수소환hasRecommendations확인:", hasRecommendations);

      if (hasRecommendations) {
        // 추천 목록이 있는 경우: 최근 추천 목록 가져오기
        this.slides2 = await this.getRecentRecommendations();
      } else if (hasRecommendations === null) {
        // 추천 목록이 없는 경우: 회원가입시 선택한 장르 영화 가져오기
        this.slides2 = await this.getDefaultGenreMovies();
      } else
        (error) => {
          // 에러 처리
          console.error("에러");
        };
    },

    // 추천 목록의 유무 확인
    async checkRecommendations() {
      let response = await this.$api("/api/checkRecommendations", {
        param: [this.$store.state.userId],
      });
      console.log("목록유무checkRecommendations의 응답", response);
      return response; // 서버에서 받아온 결과를 반환
    },

    // 추천 목록이 있는 경우, 최근 추천 목록과 비슷한 장르 영화 가져오기
    async getRecentRecommendations() {
      let response = await this.$api("/api/getRecentRecommendations", {
        param: [this.$store.state.userId],
      });
      console.log("추천목록있을때getRecentRecommendations의 응답", response);
      return response; // 서버에서 받아온 추천 목록을 반환
    },

    // 추천 목록이 없는 경우, 회원가입시 선택한 장르 영화 가져오기
    async getDefaultGenreMovies() {
      let response = await this.$api("/api/getDefaultGenreMovies", {
        param: [this.$store.state.userId],
      });
      console.log("추천목록없을때getDefaultGenreMovies의 응답", response);
      return response; // 서버에서 받아온 장르 영화 목록을 반환
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    async getmain3() {
      //인기 영화 가져오는 함수/////////////////////////////수정중!!더보기-많이추천받은영화 완성되면 그 api가져올것
      this.slides3 = await this.$api("/api/getmain3", {});
      console.log("인기영화 불러오기: ", this.slides3);
    },
    pageLink() {
      //필터링 페이지로 이동
      this.$router.push({ path: "FilteringR" });
    },
  },
  //////여기서부터는 슬라이더 설정
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
