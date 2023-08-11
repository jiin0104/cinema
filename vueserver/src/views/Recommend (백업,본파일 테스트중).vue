<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">당신에게 추천드리는 영화예요!</div>

          <!--카드-->

          <div
            v-for="(rec, index) in recList"
            :key="rec.movieid"
            style="margin: auto"
          >
            <div
              v-if="index < 4"
              style="
                position: relative;
                left: 140px;
                margin: 5px;
                display: inline-block;
                float: left;
              "
            >
              <v-layout>
                <v-card>
                  <v-img :src="rec.posterUrl" height="250px" width="220px" />

                  <div class="r_title">
                    <div>
                      <div class="headline">{{ movieid }}</div>
                    </div>
                  </div>

                  <div class="detail">
                    <button @click="openModal(rec)">상세보기</button>
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
                      :src="selectedMovie.posterUrl"
                      height="200px"
                      width="170px"
                    ></v-img>
                  </div>
                  <div
                    style="
                      font-size: 35px;
                      text-align: center;
                      width: 500px;
                      height: 50px;
                    "
                  >
                    {{ movieid }}
                  </div>
                </div>
                <div class="modalcontent" v-if="modList[0]">
                  <p>장르: {{ modList[0].GENRE }}</p>
                  <p>개봉일: {{ modList[0].MOVIE_RELEASE }}</p>
                  <p>감독: {{ modList[0].MOVIE_DIRECTOR }}</p>
                  <p>
                    주연: {{ modList[0].MOVIE_ACTORS.actor1 }},
                    {{ modList[0].MOVIE_ACTORS.actor2 }}
                  </p>
                  <p>평점: {{ modList[0].MOVIE_SCORE }}</p>
                </div>
              </div>
              <div>
                <div style="margin: 10px">
                  <form>
                    한줄리뷰
                    <div class="review">
                      {{ modList.USER_ID }} : {{ modList.REVIEW_COMMENT }}
                      <br />
                      {{ modList.USER_ID }} : {{ modList.REVIEW_COMMENT }}
                    </div>
                  </form>
                  <button
                    type="button"
                    @click="close_toggle()"
                    style="
                      color: white;
                      background-color: rgb(57, 103, 255);
                      height: 40px;
                      width: 70px;
                      font-size: 23px;
                      border-radius: 8px;
                      float: right;
                      margin-right: 5px;
                      margin-top: 5px;
                    "
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--모달창 끝-->

          <div class="rec">
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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  el: "#app",
  data() {
    return {
      logo: "logo.png",
      selectedMovie: null, //클릭한 영화 정보가 selectedMocie에 저장. 영화마다 띄워지는 모달내용이 다르므로 처음엔 초기화 시킴
      recList: [], //영화 리스트
      modList: [], //모달 리스트
    };
  },
  mounted() {
    // 서버로부터 moviePosters 데이터를 받아오기 위한 API 호출
    this.fetchMoviePosters();
  },
  methods: {
    async fetchMoviePosters() {
      try {
        // 서버로부터 moviePosters 데이터 가져오기
        const response = await axios.get("/recommend-movies");
        const moviePosters = response.data;

        // moviePosters 데이터를 recList배열에 채워넣기
        this.recList = moviePosters;
      } catch (error) {
        console.error("Error fetching movie posters:", error);
      }
    },
    async pageLink() {
      //클릭시 메인으로 이동
      this.$router.push({ path: "/" });
    },
    async URLink() {
      //내가 추천받은 목록 페이지로 이동
      this.$router.push({ path: "/UserRecommend" });
    },

    async openModal(rec) {
      // 모달창 띄우기
      this.selectedMovie = {
        ...rec,
        movieid: rec.movieid,
        posterUrl: rec.posterUrl,
      };
      // 선택한 영화 정보(영화 코드와 포스터 URL로 불러옴) selectedMovie에 저장
      await this.Get_Modal_Info(); // 모달 내용 가져오기
    },
  },
  async close_toggle() {
    //모달 닫기
    this.selectedMovie = null;
  },
  async Get_Movie_List() {
    //추천 영화 리스트 파라미터값 가져오는 함수
    this.recList = await this.$api("/api/recList", {
      param: [this.MOVIE_NUM],
    });
  },
  async Get_Modal_Info() {
    //그 영화 눌렀을때 그에 맞는 모달 정보 가져오는 함수
    console.log("Selected Movie Number:", this.selectedMovie.MOVIE_NUM); //삭제해도됨
    this.modList = await this.$api("/api/modList", {
      param: [this.selectedMovie.MOVIE_NUM],
    });
    console.log("modList Data:", this.modList); //삭제해도됨
  },
};
</script>

<style>
@import "../css/recommend.css";

.modal {
  background-color: #fff;
  width: 500px;
  max-width: 90%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  font-family: "Black Han Sans", sans-serif;
  font-size: 22px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  z-index: 1000;
}

.review {
  font-size: 18px;
  border: 1px solid #c8bdbd;
  border-radius: 5px;
  background-color: #ffa9a9;
  padding: 5px;
}

.r_title {
  font-family: "Black Han Sans", sans-serif;
  font-size: 30px;
  text-align: center;
  margin: 10px;
}

.detail {
  font-family: "Black Han Sans", sans-serif;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 10px;
  font-size: 23px;
  background-color: #3742fa;
  color: white;
  width: 150px;
  height: 30px;
}

.v-img__img--contain {
  object-fit: fill;
}

.modalcontent {
  font-size: 22px;
  border: 1px solid #c8bdbd;
  border-radius: 5px;
  background-color: #ffa9a9;
  margin-top: 5px;
  padding: 5px;
  width: 475px;
  height: 170px;
}
</style>
