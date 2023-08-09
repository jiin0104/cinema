<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">당신에게 추천드리는 영화예요!</div>

          <!--카드-->

          <div
            v-for="(rec, index) in recList"
            :key="rec.MOVIE_NUM"
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
                  <v-img :src="rec.MOVIE_POSTER" height="250px" width="220px" />

                  <div class="r_title">
                    <div>
                      <div class="headline">{{ rec.MOVIE_TITLE }}</div>
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
                      :src="selectedMovie.MOVIE_POSTER"
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
                    {{ selectedMovie.MOVIE_TITLE }}
                  </div>
                </div>
                <div class="modalcontent" v-if="modList2[0]">
                  <p>장르: {{ modList2[0].GENRE }}</p>
                  <p>개봉일: {{ modList2[0].MOVIE_RELEASE }}</p>
                  <p>감독: {{ modList2[0].MOVIE_DIRECTOR }}</p>
                  <p>주연:</p>
                  <p>평점: {{ modList2[0].MOVIE_SCORE }}</p>
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
export default {
  el: "#app",
  data() {
    return {
      logo: "logo.png",
      selectedMovie: null,
      recList: [],
      modList2: [],
    };
  },
  mounted() {
    //페이지가 실행되자마자 작동시킬함수 정의
    this.Get_Movie_List();
  },
  created() {
    this.MOVIE_NUM = this.$route.query.MOVIE_NUM;
  },

  methods: {
    pageLink() {
      //클릭시 메인으로 이동
      this.$router.push({ path: "/" });
    },
    async URLink() {
      await this.Get_Modal_Info();
      this.$router.push({ path: "/UserRecommend" });
    },

    async openModal(rec) {
      console.log("Clicked Movie Object:", rec);
      console.log("Clicked Movie Number:", rec.MOVIE_NUM);
      this.selectedMovie = { ...rec, MOVIE_NUM: rec.MOVIE_NUM };
      await this.Get_Modal_Info();
    },
    close_toggle() {
      this.selectedMovie = null;
    },
    async Get_Movie_List() {
      this.recList = await this.$api("/api/recList", {
        param: [this.MOVIE_NUM],
      });
    },
    async Get_Modal_Info() {
      console.log("Selected Movie Number:", this.selectedMovie.MOVIE_NUM);
      this.modList2 = await this.$api("/api/modList2", {
        param: [this.selectedMovie.MOVIE_NUM],
      });
      console.log("modList2 Data:", this.modList2);
    },
  },
};
</script>

<style>
@import "../css/recommend.css";

.modal {
  background-color: #fff; /* 수정: 배경색을 변경합니다 */
  width: 500px;
  max-width: 90%; /* 수정: 모달 창의 최대 너비를 90%로 설정합니다 */
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); /* 수정: 그림자 효과를 추가합니다 */
  font-family: "Black Han Sans", sans-serif;
  font-size: 22px;
  position: fixed; /* 수정: 모달을 화면에 고정시킵니다 */
  top: 50%; /* 수정: 화면 세로 중앙 정렬 */
  left: 50%; /* 수정: 화면 가로 중앙 정렬 */
  transform: translate(-50%, -50%); /* 수정: 모달을 화면 중앙으로 이동 */
  border-radius: 10px;
  z-index: 1000; /* 수정: 더 높은 z-index 값으로 설정합니다 */
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
