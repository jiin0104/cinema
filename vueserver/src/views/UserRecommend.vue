<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="userretitle">
          <div class="Recommendtitle">
            {{ userinfo.USER_NICKNAME }} 님이 추천받은 영화 목록이에요!
          </div>
          <!-- 추천된 영화 목록을 반복해서 표시 -->
          <div style="
              overflow: auto;
              width: 1500px;
              height: 550px;
              padding-left: 340px;
            ">
            <div style="display: inline-block">
              <div style="display: inline-block">
                <div v-for="(i, index) in getemoji" :key="i" :virtualIndex="index">
                  <div class="emo" style="width: 400px; height: auto">
                    <!-- 추후 필터링 선택한 이미지를 배열로 뽑아와야함 -->
                    <img style="width: 100px; height: 100px" :src="`/download2/${i.EMOJI[0]}`" />
                    <img style="width: 100px; height: 100px" :src="`/download2/${i.EMOJI[1]}`" />
                    <img style="width: 100px; height: 100px" :src="`/download2/${i.EMOJI[2]}`" />
                    <img style="width: 100px; height: 100px" :src="`/download2/${i.EMOJI[3]}`" />
                  </div>
                </div>
              </div>
              <div style="display: inline-block">
                <div v-for="(us, ind) in UserRList" :key="us" :virtualIndex="ind">
                  <div style="height: auto; margin-left: 15px">
                    <img :src="`/download/${us.POSTER[0]}`" style="height: 100px; width: 100px; margin-right: 5px"
                      @click="openModal(us, 0)" />
                    <img :src="`/download/${us.POSTER[1]}`" style="height: 100px; width: 100px; margin-right: 5px"
                      @click="openModal(us, 1)" />
                    <img :src="`/download/${us.POSTER[2]}`" style="height: 100px; width: 100px; margin-right: 5px"
                      @click="openModal(us, 2)" />
                    <img :src="`/download/${us.POSTER[3]}`" style="height: 100px; width: 100px; margin-right: 5px"
                      @click="openModal(us, 3)" />
                  </div>
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
                    <v-img :src="`/download/${modList2[0] && modList2[0].MOVIE_POSTER
                      }`" height="200px" width="170px"></v-img>
                  </div>
                  <div style="font-size: 35px; text-align: center">
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
                <div style="margin: 13px">
                  <form>
                    한줄리뷰
                    <div class="review">
                      <div v-for="review in movieReviews" :key="review.REVIEW_NUM">
                        {{ review.USER_NICKNAME }} : {{ review.REVIEW_COMMENT }}
                        <br />
                      </div>
                    </div>
                  </form>
                  <form>
                    <p>
                      <textarea class="rectext" v-model="comment" placeholder="리뷰를 작성해주세요.(30자 이내)" name="" id="Rtext"
                        maxlength="30"></textarea>
                      <v-btn class="infotext" variant="tonal" style="
                          color: white;
                          background-color: rgb(57, 103, 255);
                          height: 88px;
                          width: 105px;
                          left: 10px;
                          bottom: 38px;
                        " @click="cbtn()">
                        등록
                      </v-btn>
                    </p>
                  </form>
                  <v-btn class="infotext" variant="tonal" style="
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
                    " @click="close_toggle()">닫기
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
          <!--모달창 끝-->
          <div class="rec">
            <v-btn class="infotext" variant="tonal" style="
                color: white;
                background-color: #3742fa;
                height: 50px;
                width: 210px;
                margin: 20px;
                position: relative;
                top: 300px;
                right: 400px;
              " @click="pageLink">
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
import Swal from "sweetalert2";
axios.defaults.baseURL = "http://localhost:3000"; // 프록시 서버
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  data() {
    return {
      userinfo: {}, //로그인한 사용자 정보
      logo: "logo.png",
      selectedMovie: null, //선택한 영화 정보 초기화(모달창 눌렀다 닫았을때마다 초기화 되야함)
      UserRList: [], //추천받은 영화 목록
      modList2: [], //클릭한 영화에 대한 모달창
      getemoji: [],
      comment: "", //리뷰 코멘트
      movieReviews: [], // 리뷰 정보를 담은 배열
    };
  },
  created() {
    this.Get_user(); //페이지 보여지자마자 사용자 정보 가져오기
    this.getemo();
    this.Get_UserRList(); //추천받은 영화 목록 가져오는 함수 실행
  },
  mounted() { },
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
    async Get_UserRList() {
      //추천받은 목록 파라미터값으로 가져오는 함수
      this.UserRList = await this.$api("/api/UserRList", {
        param: [this.$store.state.userId],
      });
      console.log("UserRList:", this.UserRList);
    },
    async openModal(rec, index) {
      //첫 번쨰 방법
      //모달 열기
      this.selectedMovie = { ...rec, MOVIE_NUM: rec.MOVIE[index] };
      // 선택된 영화의 리뷰 정보를 가져오는 로직
      await this.fetchMovieReviews(this.selectedMovie.MOVIE_NUM);

      // this.modList2 = await this.$api("/api/modList2", {
      //   param: [this.selectedMovie.MOVIE[index]],
      // });
      this.modList2 = await this.$api("/api/modList2", {
        param: [this.selectedMovie.MOVIE_NUM],
      });
      console.log("modList2 : ", this.modList2);
    },

    // async openModal(rec, index) {
    //   //두 번째 방법
    //   // 모달 열기
    //   this.selectedMovie = { ...rec, MOVIE_NUM: rec.MOVIE };
    //   // 선택된 영화의 리뷰 정보를 가져오는 로직
    //   await this.fetchMovieReviews(this.selectedMovie.MOVIE_NUM);
    // },

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
    //모달창에서 '등록'버튼을 누르면 리뷰내용과 유저,영화정보를 서버로 보내주는 메소드.
    // cbtn() {
    //   axios({
    //     url: "/writeComment",
    //     method: "post",
    //     data: {
    //       comment: this.comment, // 작성한 코멘트
    //       selectedMovie: this.selectedMovie, // 오픈 모달에서 만든 selectedMovie 객체 활용
    //       userinfo: this.userinfo, //겟유저에서 만든 userinfo 객체 활용
    //     },
    //   })
    //     .then((response) => {
    //       // 성공적으로 리뷰를 등록한 후에 수행할 작업
    //       console.log(response.data.message); // 서버 응답 메시지 출력 등
    //     })
    //     .catch((error) => {
    //       // 요청이 실패한 경우 처리
    //       console.error("리뷰 등록 중 오류:", error);
    //     });
    // },

    //모달창에서 '등록'버튼을 누르면 리뷰내용과 유저,영화정보를 서버로 보내주는 메소드.
    cbtn() {
      if (this.comment === '') {
        Swal.fire({
          icon: "warning",
          title: "리뷰를 작성해주세요."
        })
      } else {
        axios
          .post("/movie/writeComment", {
            comment: this.comment, // 작성한 코멘트
            selectedMovie: this.selectedMovie.MOVIE_NUM, // 오픈 모달에서 만든 selectedMovie 객체 활용
            userinfo: this.userinfo.USER_NICKNAME, //겟유저에서 만든 userinfo 객체 활용
          })
          .then((response) => {
            // 성공적으로 리뷰를 등록한 후에 수행할 작업
            console.log(response.data.message); // 서버 응답 메시지 출력 등
          })
          .catch((error) => {
            // 요청이 실패한 경우 처리
            console.error("리뷰 등록 중 오류:", error);
          });
        console.log("서버로 보내주는 정보1", this.comment);
        console.log("서버로 보내주는 정보2", this.selectedMovie.MOVIE_NUM);
        console.log("서버로 보내주는 정보3", this.userinfo.USER_NICKNAME);
        Swal.fire({
          icon: "success",
          title: "리뷰가 등록되었습니다."
        });
        this.comment = "";
        this.close_toggle();
      }
    },
    async fetchMovieReviews(movieId) {
      //첫 번째 방법
      this.movieReviews = await this.$api("/api/review", {
        param: [movieId]
      })
    },

    //     async fetchMovieReviews(movieIds) {
    //       //두 번쨰 방법
    //       try {
    //         const requests = movieIds.map((movieId) =>
    //           axios.get(`/api/movieReviews/${movieId}`)
    //         );
    //         const responses = await axios.all(requests);
    //         this.movieReviews = responses.map((response) => response.data);
    //       } catch (error) {
    //         console.error("리뷰 정보를 가져오는 중 오류:", error);
    //       }
    //     },
    //   },
    // };
  },
};
</script>

<style>
@import "../css/userecommend.css";
</style>