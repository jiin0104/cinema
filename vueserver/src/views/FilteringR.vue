<template>
  <div>
    <div class="background">
      <div class="filter" v-if="type == 'A'">
        <div class="title">당신의 성별을 알려주세요!</div>
        <br /><br />
        <!--1차 선택창-->
        <div class="select">
          <div class="buttonlocation">
            <button type="button" class="button1" @click="female">
              <img :src="buttonImage1" style="width: 100px; height: 100px" />
            </button>
            <div class="s-text">여성</div>
            <div>
              <button type="button" class="button2" @click="male">
                <img :src="buttonImage2" style="width: 100px; height: 100px" />
              </button>
              <div class="s-text">남성</div>
            </div>
          </div>
        </div>
        <!--1차 선택창 끝-->
      </div>

      <div class="filter" v-else-if="type == 'B'">
        <div class="title">연령대는?</div>
        <br /><br />
        <!--2차 선택창-->
        <div class="select">
          <br />
          <div style="display: grid; position: relative; left: 100px">
            <div class="buttonlocation1">
              <button type="button" class="button3" @click="age0">
                10대-
              </button>
              <div>
                <button type="button" class="button3" @click="age1">
                  10대
                </button>
              </div>
            </div>
            <div class="buttonlocation1">
              <div>
                <button type="button" class="button3" @click="age2">
                  20대
                </button>
              </div>
              <div>
                <button type="button" class="button3" @click="age3">
                  30대
                </button>
              </div>
            </div>
            <div class="buttonlocation1">
              <div>
                <button type="button" class="button3" @click="age4">
                  40대
                </button>
              </div>
              <div>
                <button type="button" class="button3" @click="age5">
                  50대
                </button>
              </div>
            </div>
            <div class="buttonlocation1">
              <div>
                <button type="button" class="button3" @click="age6">
                  60대
                </button>
              </div>
              <div>
                <button type="button" class="button3" @click="age7">
                  70대+
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="filter" v-else-if="type == 'C'">
        <div class="title">선호하는 장르는?</div>
        <br /><br />
        <!--3차 선택창-->
        <div class="select">
          <br />
          <div class="buttonlocation3">
            <button type="button" class="button4" style="font-size: 27px" @click="genre1">
              애니메이션
            </button>
            <div>
              <button type="button" class="button4" @click="genre2">
                액션
              </button>
            </div>
          </div>
          <div class="buttonlocation3">
            <div>
              <button type="button" class="button4" @click="genre3">
                로맨스
              </button>
            </div>
            <div>
              <button type="button" class="button4" @click="genre4">
                코미디
              </button>
            </div>
          </div>
          <div class="buttonlocation3">
            <div>
              <button type="button" class="button4" @click="genre5">SF</button>
            </div>
            <div>
              <button type="button" class="button4" @click="genre6">
                판타지
              </button>
            </div>
          </div>
          <div class="buttonlocation3">
            <div>
              <button type="button" class="button4" @click="genre7">
                스릴러
              </button>
            </div>
            <div>
              <button type="button" class="button4" style="font-size: 27px" @click="genre8">
                다큐멘터리
              </button>
              <button type="button" class="button4" @click="genre9" style="font-size: 27px">
                전쟁
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="filter" v-else-if="type == 'D'">
        <div class="title">당신의 감정 상태를 알려주세요!</div>
        <br /><br />
        <!--1차 선택창-->
        <div class="select">
          <br />
          <div class="buttonlocation4">
            <button type="button" class="button5" @click="feel1">
              <img :src="emoji1" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">사랑중이예요</div>
            <div>
              <button type="button" class="button5" @click="feel2">
                <img :src="emoji2" style="width: 90px; height: 90px" />
              </button>
              <div class="s-text">우울해요</div>
            </div>
          </div>
          <div class="buttonlocation4">
            <button type="button" class="button5" @click="feel3">
              <img :src="emoji3" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">이별했어요&nbsp;&nbsp;</div>
            <div>
              <button type="button" class="button5" @click="feel4">
                <img :src="emoji4" style="width: 90px; height: 90px" />
              </button>
              <div class="s-text">고민있어요</div>
            </div>
          </div>
          <div class="buttonlocation4">
            <button type="button" class="button5" @click="feel5">
              <img :src="emoji5" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">행복해요&nbsp;&nbsp;&nbsp;</div>
            <div>
              <button type="button" class="button5" @click="feel6">
                <img :src="emoji6" style="width: 90px; height: 90px" />
              </button>
              <div class="s-text">심심해요</div>
            </div>
          </div>
          <div class="buttonlocation4">
            <button type="button" class="button5" @click="feel7">
              <img :src="emoji7" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">
              떠나고<br />싶어요&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
            </div>
            <div>
              <button type="button" class="button5" @click="feel8">
                <img :src="emoji8" style="width: 90px; height: 90px" />
              </button>
              <div class="s-text">화나요</div>
            </div>
          </div>
          <div class="buttonlocation4">
            <button type="button" class="button5" @click="feel9">
              <img :src="emoji9" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">
              힐링이<br />필요해요&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div>
              <button type="button" class="button5" @click="feel10">
                <img :src="emoji10" style="width: 90px; height: 90px" />
              </button>
              <div class="s-text">배고파요</div>
            </div>
          </div>
        </div>
      </div>

      <div class="filter" v-else-if="type == 'E'">
        <div class="title">선택하신 사항이 맞나요?</div>
        <br /><br />

        <!--필터 선택 결과-->
        <div class="select">
          <br />
          <div class="buttonlocation5">
            <button type="button" class="button5">
              <img :src="select1" style="width: 70px; height: 70px" />
            </button>
            <div class="r-text" v-if="this.selectarray[0] == 'man.png'">남자</div>
            <div class="r-text" v-else-if="this.selectarray[0] == 'woman.png'">여자</div>
          </div>

          <div class="buttonlocation5">
            <button type="button" class="button5">
              <img :src="select2" style="width: 70px; height: 70px" />
            </button>
            <div class="r-text" v-if="this.selectarray[1] == 'age0.png'">10대 미만</div>
            <div class="r-text" v-if="this.selectarray[1] == 'age1.png'">10대</div>
            <div class="r-text" v-if="this.selectarray[1] == 'age2.png'">20대</div>
            <div class="r-text" v-if="this.selectarray[1] == 'age3.png'">30대</div>
            <div class="r-text" v-if="this.selectarray[1] == 'age4.png'">40대</div>
            <div class="r-text" v-if="this.selectarray[1] == 'age5.png'">50대</div>
            <div class="r-text" v-if="this.selectarray[1] == 'age6.png'">60대</div>
            <div class="r-text" v-if="this.selectarray[1] == 'age7.png'">70대 이상</div>
            
          </div>

          <div class="buttonlocation5">
            <button type="button" class="button5">
              <img :src="select3" style="width: 70px; height: 70px" />
            </button>
            <div class="r-text" v-if="this.selectarray[2] == 'genre1.png'">애니메이션</div>
            <div class="r-text" v-if="this.selectarray[2] == 'genre2.png'">액션</div>
            <div class="r-text" v-if="this.selectarray[2] == 'genre3.png'">로맨스</div>
            <div class="r-text" v-if="this.selectarray[2] == 'genre4.png'">코미디</div>
            <div class="r-text" v-if="this.selectarray[2] == 'genre5.png'">SF</div>
            <div class="r-text" v-if="this.selectarray[2] == 'genre6.png'">판타지</div>
            <div class="r-text" v-if="this.selectarray[2] == 'genre7.png'">스릴러</div>
            <div class="r-text" v-if="this.selectarray[2] == 'genre8.png'">다큐멘터리</div>
            <div class="r-text" v-if="this.selectarray[2] == 'genre9.png'">전쟁</div>

          </div>

          <div class="buttonlocation5">
            <button type="button" class="button5">
              <img :src="select4" style="width: 70px; height: 70px" />
            </button>
            <div class="r-text" v-if="this.selectarray[3] == 'love.png'">사랑중이에요</div>
            <div class="r-text" v-if="this.selectarray[3] == 'sad.png'">우울해요</div>
            <div class="r-text" v-if="this.selectarray[3] == 'crying.png'">이별했어요</div>
            <div class="r-text" v-if="this.selectarray[3] == 'thinking.png'">고민있어요</div>
            <div class="r-text" v-if="this.selectarray[3] == 'smiling.png'">행복해요</div>
            <div class="r-text" v-if="this.selectarray[3] == 'musical-note.png'">심심해요</div>
            <div class="r-text" v-if="this.selectarray[3] == 'plane.png'">떠나고 싶어요</div>
            <div class="r-text" v-if="this.selectarray[3] == 'angry.png'">화나요</div>
            <div class="r-text" v-if="this.selectarray[3] == 'cat.png'">힐링이 필요해요</div>
            <div class="r-text" v-if="this.selectarray[3] == 'tongue.png'">배고파요</div>

          </div>
          <br /><br />
          <div class="filterselected" style="text-align: center">
            <v-btn type="button" id="filtercancel" variant="tonal" @click="filtercancel" style="
                color: white;
                background-color: rgb(255, 57, 57);
                height: 50px;
                width: 125px;
                font-size: 30px;
                margin-right: 10%;
              ">처음으로</v-btn>
            <v-btn type="button" id="filterconfirm" variant="tonal" @click="filterconfirm" style="
                color: white;
                background-color: rgb(57, 60, 255);
                height: 50px;
                width: 125px;
                font-size: 30px;
              ">확인</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../css/filtering.css";
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      buttonImage1: "woman.png",
      buttonImage2: "man.png",
      emoji1: "love.png",
      emoji2: "sad.png",
      emoji3: "crying.png",
      emoji4: "thinking.png",
      emoji5: "smiling.png",
      emoji6: "musical-note.png",
      emoji7: "plane.png",
      emoji8: "angry.png",
      emoji9: "cat.png",
      emoji10: "tongue.png",
      select1: "1.png",
      select2: "2.png",
      select3: "3.png",
      select4: "4.png",
      type: "A",
      selectarray: [],
      e1: "",
      e2: "",
      e3: "",
      e4: "",
      ne1: "",
      ne2: "",
      ne3: "",
      ne4: "",
      userNo: this.$store.state.userNo,
    };
  },
  methods: {
    //1차 필터
    female() {
      this.selectarray.push("woman.png");
      return (this.type = "B"), this.selectarray, console.log(this.selectarray);
    },
    male() {
      this.selectarray.push("man.png");
      return (this.type = "B"), this.selectarray, console.log(this.selectarray);
    },

    //2차 필터
    age0() {
      this.selectarray.push("age0.png");
      return (this.type = "C"), this.selectarray, console.log(this.selectarray);
    },
    age1() {
      this.selectarray.push("age1.png");
      return (this.type = "C"), this.selectarray, console.log(this.selectarray);
    },
    age2() {
      this.selectarray.push("age2.png");
      return (this.type = "C"), this.selectarray, console.log(this.selectarray);
    },
    age3() {
      this.selectarray.push("age3.png");
      return (this.type = "C"), this.selectarray, console.log(this.selectarray);
    },
    age4() {
      this.selectarray.push("age4.png");
      return (this.type = "C"), this.selectarray, console.log(this.selectarray);
    },
    age5() {
      this.selectarray.push("age5.png");
      return (this.type = "C"), this.selectarray, console.log(this.selectarray);
    },
    age6() {
      this.selectarray.push("age6.png");
      return (this.type = "C"), this.selectarray, console.log(this.selectarray);
    },
    age7() {
      this.selectarray.push("age7.png");
      return (this.type = "C"), this.selectarray, console.log(this.selectarray);
    },

    //3차 필터
    genre1() {
      this.selectarray.push("genre1.png"); //"genres":[{"id":16,"name":"Animation"}]
      return (this.type = "D"), this.selectarray, console.log(this.selectarray);
    },
    genre2() {
      this.selectarray.push("genre2.png"); //"genres":[{"id":28,"name":"Action"}]
      return (this.type = "D"), this.selectarray, console.log(this.selectarray);
    },
    genre3() {
      this.selectarray.push("genre3.png"); //"genres":[{"id":10749,"name":"Romance"}]
      return (this.type = "D"), this.selectarray, console.log(this.selectarray);
    },
    genre4() {
      this.selectarray.push("genre4.png"); //"genres":[{"id":35,"name":"Comedy"}]
      return (this.type = "D"), this.selectarray, console.log(this.selectarray);
    },
    genre5() {
      this.selectarray.push("genre5.png"); //"genres":[ {"id":878,"name":"Science Fiction"}]
      return (this.type = "D"), this.selectarray, console.log(this.selectarray);
    },
    genre6() {
      this.selectarray.push("genre6.png"); //"genres":[{"id":14,"name":"Fantasy"}]
      return (this.type = "D"), this.selectarray, console.log(this.selectarray);
    },
    genre7() {
      this.selectarray.push("genre7.png"); //"genres":[{"id":53,"name":"Thriller"}]
      return (this.type = "D"), this.selectarray, console.log(this.selectarray);
    },
    genre8() {
      this.selectarray.push("genre8.png"); //"genres":[{"id":99,"name":"Documentary"}]
      return (this.type = "D"), this.selectarray, console.log(this.selectarray);
    },
    genre9() {
      this.selectarray.push("genre9.png"); //"genres":[{"id":10752,"name":"War"}]
      return (this.type = "D"), this.selectarray, console.log(this.selectarray);
    },

    //4차 필터
    feel1() {
      this.selectarray.push("love.png"); //"genres":[{"id":18,"name":"Drama"}]
      return (this.type = "E"), this.selectarray, console.log(this.selectarray);
    },
    feel2() {
      this.selectarray.push("sad.png"); //"genres":[{"id":10751,"name":"Family"}]
      return (this.type = "E"), this.selectarray, console.log(this.selectarray);
    },
    feel3() {
      this.selectarray.push("cry.png"); //"genres":[{"id":18,"name":"Drama"}]
      return (this.type = "E"), this.selectarray, console.log(this.selectarray);
    },
    feel4() {
      this.selectarray.push("thinking.png"); //"genres":[{"id":36,"name":"History"}]
      return (this.type = "E"), this.selectarray, console.log(this.selectarray);
    },
    feel5() {
      this.selectarray.push("smiling.png"); //"genres":[{"id":10402,"name":"Music"}]
      return (this.type = "E"), this.selectarray, console.log(this.selectarray);
    },
    feel6() {
      this.selectarray.push("musical-note.png"); //"genres":[ {"id":35,"name":"Comedy"}]
      return (this.type = "E"), this.selectarray, console.log(this.selectarray);
    },
    feel7() {
      this.selectarray.push("plane.png"); //"genres":[{"id":12,"name":"Adventure"}]
      return (this.type = "E"), this.selectarray, console.log(this.selectarray);
    },
    feel8() {
      this.selectarray.push("angry.png"); //"genres":[{"id":80,"name":"Crime"}]
      return (this.type = "E"), this.selectarray, console.log(this.selectarray);
    },
    feel9() {
      this.selectarray.push("cat.png"); //"genres":[{"id":10770,"name":"TV Movie"}]
      return (this.type = "E"), this.selectarray, console.log(this.selectarray);
    },
    feel10() {
      this.selectarray.push("tongue.png"); //"genres":[{"id":9648,"name":"Mystery"}]
      return (this.type = "E"), this.selectarray, console.log(this.selectarray);
    },

    // 필터 종합
    filtercancel() {
      location.href = "/FilteringR";
    },
    // 필터 확인 버튼 클릭 시 처리
    async filterconfirm() {
      const formData = {
        e1: this.selectarray[0],
        e2: this.selectarray[1],
        e3: this.selectarray[2],
        e4: this.selectarray[3],
        ne1: "emoji1",
        ne2: "emoji2",
        ne3: "emoji3",
        ne4: "emoji4",
        userNo: this.userNo
      };

      axios.post('/rcinsert', formData)
        .then(response => {
          if (response.data.message) {
            alert(response.data.message);
          } else {
            alert('등록에 실패했습니다.');
            console.log(formData);
          }
        })
        .catch(error => {
          console.error('등록 실패', error);
          alert('등록 실패. 확인 후 다시 시도해 주세요');
        });

      // 선택한 장르 정보 가져오기
      const selectedGenres = this.selectarray
        .map((genre) => {
          const genreId = this.mapGenreNameToId(genre); // 각 장르 이름을 ID로 변환
          return genreId !== null ? genreId : undefined; // null이 아닌 경우에만 반환
        })
        .filter((genreId) => genreId !== undefined); // undefined 값 제거

      //매핑된 장르id가 제대로 배열에 들어갔는지 확인
      console.log("selectedGenres:", selectedGenres);

      try {
        // API 요청 보내기
        const response = await axios.post("/fetch-movies", {
          selectedGenres: selectedGenres,
        });

        const poster = await axios.post("/recommend-movies", {
          selectedGenres: selectedGenres,
        });


        // 필요한 작업 수행
        console.log(response); // 성공한 경우 응답 확인
        console.log(poster); // 성공한 경우 응답 확인
        // 결과 페이지로 이동
        this.$router.push({
          path: "/FinalFilter",
        });
      } catch (error) {
        console.error("Error fetching and processing movies:", error);
        // 에러 처리
      }
    },

    // 장르 이름을 장르 ID로 매핑
    mapGenreNameToId(genreName) {
      const genreMap = {
        'genre1.png': 16,
        'genre2.png': 28,
        'genre3.png': 10749,
        'genre4.png': 35,
        'genre5.png': 878,
        'genre6.png': 14,
        'genre7.png': 53,
        'genre8.png': 99,
        'genre9.png': 10752,
        'love.png': 18,
        'sad.png': 10751,
        'crying.png': 18,
        'thinking.png': 36,
        'smiling.png': 10402,
        'musical-note.png': 35,
        'plane.png': 12,
        'angry.png': 80,
        'cat.png': 10770,
        'tongue.png': 9648,
      };
      return genreMap[genreName] || null;
    },
  },
};
</script>
