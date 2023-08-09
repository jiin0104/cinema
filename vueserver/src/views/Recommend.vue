<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">당신에게 추천드리는 영화예요!</div>

          <!--카드-->
          <div v-for="(rec, index) in recList" :key="rec.MOVIE_NUM">
            <div
              v-if="index < 4"
              style="
                position: relative;
                left: 140px;
                margin: 5px;
                display: inline-block;
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
                    <button @click="handle_toggle(rec)">상세보기</button>
                  </div>
                </v-card>
              </v-layout>
            </div>
          </div>

          <!--카드 끝-->

          <!--모달창-->
          <div v-show="is_show" class="modal">
            <div
              class="list"
              v-for="(modL, i) in modList"
              :key="i"
              style="align-items: center; margin: 10px"
            >
              <div>
                <div style="position: relative; left: 150px">
                  <v-img
                    :src="`/download/${modL.MOVIE_NUM}/${modL.MOVIE_POSTER}`"
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
                  {{ modL.MOVIE_TITLE }}
                </div>
              </div>
              <div class="modalcontent">
                <p>장르: {{ modL.GENRE }}</p>
                <p>개봉일: {{ modL.MOVIE_RELEASE }}</p>
                <p>감독: {{ modL.MOVIE_DIRECTOR }}</p>
                <p>주연: {{ modL.MOVIE_ACTORS.actor1 }}, {{ modL.MOVIE_ACTORS.actor2 }}</p>
                <p>평점: {{ modL.MOVIE_SCORE }}</p>
              </div>
            </div>
            <div>
              <div style="margin: 10px">
                <form>
                  한줄리뷰
                  <div class="review">
                    modL.USER_ID : modL.REVIEW_COMMENT <br />
                    modL.USER_ID : modL.REVIEW_COMMENT
                  </div>
                </form>
                <button
                  type="button"
                  @click="handle_toggle()"
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
          <!--모달창 끝-->

          <div class="rec" style="position: relative; left: 350px; top: 50px">
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
      is_show: false,
      MOVIE_NUM: 0,
      recList: [],
      modList: [],

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
    URLink() {
      this.$router.push({ path: "/UserRecommend" });
    },

    handle_toggle() {
      //모달창
      this.is_show = !this.is_show;

      this.Get_Modal_Info();
    },

    async Get_Movie_List() {
      //추천 영화 리스트 가져오는 쿼리
      this.recList = await this.$api("/api/recList", {
        param: [this.MOVIE_NUM],
      });
    },
    async Get_Modal_Info() {
      //모달창의 영화 정보
      this.modList = await this.$api("/api/modList2", {
        param: [this.MOVIE_NUM],
      });
    },
  },
};
</script>

<style>
@import "../css/recommend.css";

.modal {
  background-color: #d9d9d9;
  width: 500px;
  height: 600px;
  margin: 0 auto;
  font-family: "Black Han Sans", sans-serif;
  font-size: 22px;
  position: relative;
  bottom: 450px;
  border-radius: 10px;
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
