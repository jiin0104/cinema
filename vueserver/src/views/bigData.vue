<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="userretitleB">
          <div class="RecommendtitleB">
            많은 사람들이 추천받은 영화 목록이에요!
          </div>
          <!-- 추천된 영화 목록을 반복해서 표시 -->
          <div
            style="
              overflow: auto;
              width: 1500px;
              height: 550px;
            "
          >
          <!--카드-->

          <div
            v-for="(rec, index) in recList"
            :key="rec.MOVIE_NUM"
            style="margin-left: 145px"
          >
            <div
              v-if="index < 20"
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
                  style="max-width: 270px; max-height: 450px; height: 450px; margin-bottom: 30px;"
                >
                  <v-img
                    :src="`/download/${rec.MOVIE_POSTER}`"
                    height="300px"
                    width="270px"
                  />

                  <div class="r_title">
                    <div>
                      <div class="headline">{{ rec.MOVIE_TITLE }}</div>
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
        </div>
          <!--카드 끝-->

          <!--모달창-->
          <div v-if="selectedMovie" class="modal" id="modal">
            <div class="list">
              <div style="align-items: center; margin: 10px">
                <div>
                  <div style="position: relative; left: 150px">
                    <v-img
                      :src="`/download/${selectedMovie.MOVIE_POSTER}`"
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
                      {{ modList2.USER_ID }} : {{ modList2.REVIEW_COMMENT }}
                      <br />
                      {{ modList2.USER_ID }} : {{ modList2.REVIEW_COMMENT }}
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
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000"; // 프록시 서버
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  data() {
    return {
      logo: "logo.png",
      selectedMovie: null, //선택한 영화 정보 초기화(모달창 눌렀다 닫았을때마다 초기화 되야함)
      recList: [], //추천받은 영화 목록
      modList2: [], //클릭한 영화에 대한 모달창
    };
  },
  created() {
    this.Get_RecList(); //추천받은 영화 목록 가져오는 함수 실행
  },
  mounted() {},
  methods: {
    async Get_RecList() {
      //추천받은 목록 파라미터값으로 가져오는 함수
      this.recList = await this.$api("/api/UserRList", {
        param: [this.$store.state.userId],
      });
      console.log("reclist:", this.recList);
    },
    async openModal(rec) {
      //모달 열기
      this.selectedMovie = { ...rec, MOVIE_NUM: rec.MOVIE };
      this.modList2 = await this.$api("/api/modList2", {
        param: [this.selectedMovie.MOVIE[0]],
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
    },
  },
};
</script>

<style>
@import "../css/bigData.css";
</style>
