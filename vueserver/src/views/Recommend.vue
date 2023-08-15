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
                      <div class="headline">
                        {{ "영화 제목이 들어가야 됨" }}
                      </div>
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
                    {{ "영화 제목이 들어가야됨" }}
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
                    <!-- 시간되면 하기  -->
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
export default {
  el: "#app",
  data() {
    return {
      logo: "logo.png",
      selectedMovie: null, //클릭한 영화 정보가 selectedMocie에 저장. 영화마다 띄워지는 모달내용이 다르므로 처음엔 초기화 시킴
      recList: [], //영화 리스트
      modList: [], //모달 리스트채워넣기
    };
  },
  methods: {
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

      //콘솔로 데이터확인
      console.log(this.selectedMovie);

      // 선택한 영화 정보(영화 코드와 포스터 URL로 불러옴) selectedMovie에 저장
      await this.Get_Modal_Info(); // 모달 내용 가져오기
    },
  },
  async close_toggle() {
    //모달 닫기
    this.selectedMovie = null;
  },
  async Get_Modal_Info() {},
};
</script>

<style>
@import "../css/recommend.css";

</style>
