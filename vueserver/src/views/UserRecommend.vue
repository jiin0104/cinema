<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="userretitle">
          <div class="Recommendtitle">
            {{ userinfo.USER_NICKNAME }} 님이 추천받은 영화 목록이에요!
          </div>
          <!-- 추천된 영화 목록을 반복해서 표시 -->
          <div
            style="
              overflow: auto;
              width: 1500px;
              height: 550px;
              padding-left: 340px;
            "
          >
          <div style="display: inline-block;">
            <div v-for="(i, index) in getemoji" :key="i" :virtualIndex="index">
              <div
                class="emo"
                style="
                  width: 400px;
                  height: auto;
                  position: relative;
                  top: 20px;
                "
              >
                <!-- 추후 필터링 선택한 이미지를 배열로 뽑아와야함 -->
                <img
                  style="width: 100px; height: 100px"
                  :src="`/download2/${i.EMOJI[0]}`"
                />
                <img
                  style="width: 100px; height: 100px"
                  :src="`/download2/${i.EMOJI[1]}`"
                />
                <img
                  style="width: 100px; height: 100px"
                  :src="`/download2/${i.EMOJI[2]}`"
                />
                <img
                  style="width: 100px; height: 100px"
                  :src="`/download2/${i.EMOJI[3]}`"
                />
              </div>
            </div>
          </div>
          <div style="display: inline-block;">
            <div v-for="(rec, ind) in recList" :key="rec" :virtualIndex="ind" >
              <div
                style="
                  position: relative;
                  top: 20px;
                  margin: 3px;
                  height: auto;
                "
              >
                <img
                  :src="`/download/${rec.POSTER[0]}`"
                  style="height: 100px; width: 100px"
                  @click="openModal(rec)"
                />
                <img
                  :src="`/download/${rec.POSTER[1]}`"
                  style="height: 100px; width: 100px"
                  @click="openModal1(rec)"
                />
                <img
                  :src="`/download/${rec.POSTER[2]}`"
                  style="height: 100px; width: 100px"
                  @click="openModal2(rec)"
                />
                <img
                  :src="`/download/${rec.POSTER[3]}`"
                  style="height: 100px; width: 100px"
                  @click="openModal3(rec)"
                />
              </div>
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
                      :src="`/download/${modList2[0].MOVIE_POSTER}`"
                      height="200px"
                      width="170px"
                    ></v-img>
                  </div>
                  <div style="font-size: 35px; text-align: center">
                    {{ selectedMovie.MOVIE_TITLE }}
                  </div>
                </div>
                <div class="modalcontent" v-if="modList2[0]">
                  <p>장르: {{ modList2[0].GENRE1 }},{{ modList2[0].GENRE2 }}</p>
                  <p>개봉일: {{ modList2[0].FORMATTED_RELEASE }}</p>
                  <p>감독: {{ modList2[0].MOVIE_DIRECTOR }}</p>
                  <p>주연: {{ modList2[0].MOVIE_ACTORS }},</p>
                  <p>평점: {{ modList2[0].MOVIE_SCORE }}/100</p>
                </div>
              </div>
              <div>
                <div style="margin: 13px">
                  <form>
                    한줄리뷰
                    <div class="review">
                      {{ modList2.USER_ID }} : {{ modList2.REVIEW_COMMENT }}
                      <br />
                      {{ modList2.USER_ID }} : {{ modList2.REVIEW_COMMENT }}
                    </div>
                  </form>
                  <form>
                    <p>
                      <textarea
                        class="rectext"
                        placeholder="리뷰를 작성해주세요.(30자 이내)"
                        name=""
                        id=""
                        maxlength="30"
                      ></textarea>
                      <v-btn
                        @click="login"
                        class="infotext"
                        variant="tonal"
                        style="
                          color: white;
                          background-color: rgb(57, 103, 255);
                          height: 88px;
                          width: 105px;
                          left: 10px;
                          bottom: 38px;
                        "
                      >
                        등록
                      </v-btn>
                    </p>
                  </form>
                  <v-btn
                    class="infotext"
                    variant="tonal"
                    style="
                      color: white;
                      background-color: rgb(57, 103, 255);
                      height: 40px;
                      width: 70px;
                      font-size: 23px;
                      border-radius: 8px;
                      float: right;
                      margin-right: 5px;
                      margin-bottom: 20px;
                      margin-top: -15px;
                    "
                    @click="close_toggle()"
                    >닫기
                  </v-btn>
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
                position: relative;
                top: 300px;
                right: 400px;
              "
              @click="pageLink"
            >
              다시 추천받기
            </v-btn>
          </div>
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
      userinfo: {}, //로그인한 사용자 정보
      logo: "logo.png",
      selectedMovie: null, //선택한 영화 정보 초기화(모달창 눌렀다 닫았을때마다 초기화 되야함)
      recList: [], //추천받은 영화 목록
      modList2: [], //클릭한 영화에 대한 모달창
      getemoji: [],
    };
  },
  created() {
    this.Get_user(); //페이지 보여지자마자 사용자 정보 가져오기
    this.getemo();
    this.Get_RecList(); //추천받은 영화 목록 가져오는 함수 실행
  },
  mounted() {},
  methods: {
    pageLink() {
      this.$router.push({ path: "/" }); //다시추천받기 버튼 클릭시 메인으로 이동
    },
    async Get_user() {
      let userinfo = await this.$api("/api/userin", {
        param: [this.$store.state.userId], //사용자 정보 가져오기
      });
      this.userinfo = userinfo[0];
    },
    async Get_RecList() {
      //추천받은 목록 파라미터값으로 가져오는 함수
      this.recList = await this.$api("/api/recList3", {
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
      console.log("modList2 : ", this.modList2)
    },
    async openModal1(rec) {
      //모달 열기
      this.selectedMovie = { ...rec, MOVIE_NUM: rec.MOVIE };
      this.modList2 = await this.$api("/api/modList2", {
        param: [this.selectedMovie.MOVIE[1]],
      });
      console.log("modList2 : ", this.modList2)
    },
    async openModal2(rec) {
      //모달 열기
      this.selectedMovie = { ...rec, MOVIE_NUM: rec.MOVIE };
      this.modList2 = await this.$api("/api/modList2", {
        param: [this.selectedMovie.MOVIE[2]],
      });
      console.log("modList2 : ", this.modList2)
    },
    async openModal3(rec) {
      //모달 열기
      this.selectedMovie = { ...rec, MOVIE_NUM: rec.MOVIE };
      this.modList2 = await this.$api("/api/modList2", {
        param: [this.selectedMovie.MOVIE[3]],
      });
      console.log("modList2 : ", this.modList2)
    },
    close_toggle() {
      //모달 닫기
      this.selectedMovie = null;
    },

    async getemo() {
      this.getemoji = await this.$api("/api/emojipath2", {
        param: [this.$store.state.userId],
      });
      console.log(this.getemoji);
    },
  },
};
</script>

<style>
@import "../css/userecommend.css";
</style>
