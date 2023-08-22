<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="rectitle">
          <div class="formtitle">당신에게 추천드리는 영화예요!</div>

          <!--카드-->

          <div
            v-for="(rec, index) in recList"
            :key="rec"
            :virtualIndex="index"
            style="margin-left: 145px"
          >
            <div
              v-if="index < 4"
              style="
                position: relative;
                left: 45px;
                margin: 5px;
                display: inline-block;
                float: left;
              "
            >
              <v-layout>
                <v-card
                  style="max-width: 270px; max-height: 450px; height: 450px"
                >
                  <v-img
                    :src="`/download/${rec.POSTER}`"
                    height="300px"
                    width="270px"
                  />

                  <div class="r_title">
                    <div>
                      <div class="headline">{{ rec.TITLE }}</div>
                    </div>
                  </div>
                  <div class="recbtn">
                    <v-btn
                      class="infotext"
                      variant="tonal"
                      style="
                      color: white;
                      background-color: #3742fa;
                      width: 150px;
                      height: 30px;
                      margin: 60px;
                      "
                      @click="openModal(rec)"
                    >
                      상세보기
                    </v-btn>
                  </div>
                </v-card>
              </v-layout>
            </div>
          </div>
          <!--카드 끝-->

          <!--모달창-->
          <div v-if="selectedMovie" class="modal" id="modal">
            <div class="list">
              <div style="align-items: center; margin: 10px">
                <div>
                  <div style="position: relative; left: 150px">
                    <v-img
                      :src="`/download/${selectedMovie.POSTER}`"
                      height="200px"
                      width="170px"
                    ></v-img>
                  </div>
                  <div
                    style="
                      font-size: 35px;
                      text-align: center;
                    ">
                    {{ selectedMovie.MOVIE_TITLE }}
                  </div>
                </div>
                <div class="modalcontent" v-if="modList2[0]">
                  <p>장르: {{ modList2[0].GENRE1 }},{{ modList2[0].GENRE2 }}</p>
                  <p>개봉일: {{ modList2[0].FORMATTED_RELEASE }}</p>
                  <p>감독: {{ modList2[0].MOVIE_DIRECTOR }}</p>
                  <p>주연: {{ modList2[0].MOVIE_ACTORS }}</p>
                  <p>평점: {{ modList2[0].MOVIE_SCORE }}/100</p>
                </div>
              </div>
              <div>
                <div style="margin: 10px">
                  <form>
                    한줄리뷰
                    <div class="review">
                      <div v-for="review in movieReviews" :key="review.REVIEW_NUM">
                        {{ review.USER_NICKNAME }} : {{ review.REVIEW_COMMENT }}
                        <br />
                      </div>
                    </div>
                  </form>
                  <v-btn
                    class="infotext"
                    @click="close_toggle()"
                    variant="tonal"
                    style="
                      color: white;
                      background-color: #3742fa;
                      height: 40px;
                      width: 70px;
                      font-size: 23px;
                      border-radius: 8px;
                      float: right;
                      margin-right: 5px;
                      margin-top: 15px;
                      margin-bottom: 20px;
                     ">닫기
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
          <!--모달창 끝-->
        </div>
        <div class="recorec">
          <v-btn
            class="infotext"
            variant="tonal"
            style="
              color: white;
              background-color: #3742fa;
              height: 50px;
              width: 210px;
              margin: 20px;
            "
            @click="pageLink"
          >
            다시 추천받기
          </v-btn>
          <v-btn
            class="infotext"
            variant="tonal"
            style="
              color: white;
              background-color: #3742fa;
              height: 50px;
              width: 210px;
              margin: 20px;
            "
            @click="URLink"
          >
            추천받은 목록보기
          </v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  el: "#app",
  data() {
    return {
      logo: "logo.png",
      selectedMovie: null, //클릭한 영화 정보가 selectedMocie에 저장. 영화마다 띄워지는 모달내용이 다르므로 처음엔 초기화 시킴
      recList: [], //영화 리스트
      modList2: [], //모달 리스트
      movieReviews: [],
    };
  },
  mounted() {
    //페이지가 실행되자마자 영화 리스트 데이터 보여주기
    
  },
  created() {
    this.Get_Movie_List();
    //영화코드=쿼리의 영화코드
    this.MOVIE_NUM = this.$route.query.MOVIE_NUM;
  },

  methods: {
    pageLink() {
      //클릭시 메인으로 이동
      this.$router.push({ path: "/" });
    },
    async URLink() {
      //내가 추천받은 목록 페이지로 이동
      this.$router.push({ path: "/UserRecommend" });
    },

    async openModal(rec) {
      //모달창 띄우기
      this.selectedMovie = { ...rec, MOVIE_NUM: rec.MOVIE_NUM };
      //선택한 영화 정보(영화 코드로 불러옴) selectedMovie에 저장
      await this.fetchMovieReviews(this.selectedMovie.MOVIE_NUM);
      this.modList2 = await this.$api("/api/modList2", {
        param: [this.selectedMovie.MOVIE_NUM],
      });
    },
    close_toggle() {
      //모달 닫기
      this.selectedMovie = null;
    },
    async Get_Movie_List() {
      //추천 영화 리스트 파라미터값 가져오는 함수
      this.recList = await this.$api("/api/recList", {
        param: [this.$store.state.userId],
      });
      console.log("recList : ", this.recList);
    },
    async fetchMovieReviews(movieId) {
      //첫 번째 방법
      this.movieReviews = await this.$api("/api/review", {
        param: [movieId]
      })
    },
  },
};
</script>

<style>
@import "../css/recommend.css";
</style>
