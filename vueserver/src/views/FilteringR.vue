<template>
  <div>
    <div class="background">
      <!-- 좌상단 로고 -->
      <v-container class="header"> wavecinema </v-container><br />
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
          <br /><br />
          <div class="buttonlocation1">
            <button type="button" class="button3" @click="age0">어린이</button>
            <div>
              <button type="button" class="button3" @click="age1">10대</button>
            </div>
          </div>
          <div class="buttonlocation1">
            <div>
              <button type="button" class="button3" @click="age2">20대</button>
            </div>
            <div>
              <button type="button" class="button3" @click="age3">30대</button>
            </div>
          </div>
          <div class="buttonlocation1">
            <div>
              <button type="button" class="button3" @click="age4">40대</button>
            </div>
            <div>
              <button type="button" class="button3" @click="age5">50대</button>
            </div>
          </div>
          <div class="buttonlocation1">
            <div>
              <button type="button" class="button3" @click="age6">60대</button>
            </div>
            <div>
              <button type="button" class="button3" @click="age7">70대+</button>
            </div>
          </div>
        </div>
      </div>

      <div class="filter" v-else-if="type == 'C'">
        <div class="title">선호하는 장르는?</div>
        <br /><br />
        <!--2차 선택창-->
        <div class="select">
          <br /><br />
          <div class="buttonlocation3">
            <button type="button" class="button4" style="font-size: 27px" @click="genre1">
              애니메이션
            </button>
            <div>
              <button type="button" class="button4" @click="genre2">액션</button>
            </div>
          </div>
          <div class="buttonlocation3">
            <div>
              <button type="button" class="button4" @click="genre3">로맨스</button>
            </div>
            <div>
              <button type="button" class="button4" @click="genre4">코미디</button>
            </div>
          </div>
          <div class="buttonlocation3">
            <div>
              <button type="button" class="button4" @click="genre5">SF</button>
            </div>
            <div>
              <button type="button" class="button4" @click="genre6">판타지</button>
            </div>
          </div>
          <div class="buttonlocation3">
            <div>
              <button type="button" class="button4" @click="genre7">스릴러</button>
            </div>
            <div>
              <button type="button" class="button4" style="font-size: 27px" @click="genre8">
                다큐멘터리
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
          <div class="buttonlocation4">
            <button type="button" class="button5">
              <img :src="select1" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">{{ this.selectarray[0] }}</div>
          </div>

          <div class="buttonlocation4">
            <button type="button" class="button5">
              <img :src="select2" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">{{ this.selectarray[1] }}</div>
          </div>

          <div class="buttonlocation4">
            <button type="button" class="button5">
              <img :src="select3" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">{{ this.selectarray[2] }}</div>
          </div>

          <div class="buttonlocation4">
            <button type="button" class="button5">
              <img :src="select4" style="width: 90px; height: 90px" />
            </button>
            <div class="s-text">{{ this.selectarray[3] }}</div>
          </div>
          <br><br>
          <div class="filterselected" style="text-align: center;">
            <v-btn type="button" id="filtercancel" variant="tonal" @click="filtercancel"
              style="color: white; background-color: rgb(255, 57, 57); height: 50px; width: 125px; font-size: 30px; margin-right: 10%;">처음으로</v-btn>
            <v-btn type="button" id="filterconfirm" variant="tonal" @click="filterconfirm"
              style="color: white; background-color: rgb(57, 60, 255); height: 50px; width: 125px; font-size: 30px;">확인</v-btn>
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
      type: 'A',
      selectarray: [],
    };
  },
  methods: {
    //1차 필터
    female() {
      this.selectarray.push('여성');
      return this.type = 'B', this.selectarray,
        console.log(this.selectarray);
    },
    male() {
      this.selectarray.push('남성');
      return this.type = 'B', this.selectarray,
        console.log(this.selectarray);
    },

    //2차 필터
    age0() {
      this.selectarray.push('10대미만');
      return this.type = 'C', this.selectarray,
        console.log(this.selectarray);
    },
    age1() {
      this.selectarray.push('10대');
      return this.type = 'C', this.selectarray,
        console.log(this.selectarray);
    },
    age2() {
      this.selectarray.push('20대');
      return this.type = 'C', this.selectarray,
        console.log(this.selectarray);
    },
    age3() {
      this.selectarray.push('30대');
      return this.type = 'C', this.selectarray,
        console.log(this.selectarray);
    },
    age4() {
      this.selectarray.push('40대');
      return this.type = 'C', this.selectarray,
        console.log(this.selectarray);
    },
    age5() {
      this.selectarray.push('50대');
      return this.type = 'C', this.selectarray,
        console.log(this.selectarray);
    },
    age6() {
      this.selectarray.push('60대');
      return this.type = 'C', this.selectarray,
        console.log(this.selectarray);
    },
    age7() {
      this.selectarray.push('70대이상');
      return this.type = 'C', this.selectarray,
        console.log(this.selectarray);
    },

    //3차 필터
    genre1() {
      this.selectarray.push('애니메이션');
      return this.type = 'D', this.selectarray,
        console.log(this.selectarray);
    },
    genre2() {
      this.selectarray.push('액션');
      return this.type = 'D', this.selectarray,
        console.log(this.selectarray);
    },
    genre3() {
      this.selectarray.push('로맨스');
      return this.type = 'D', this.selectarray,
        console.log(this.selectarray);
    },
    genre4() {
      this.selectarray.push('코미디');
      return this.type = 'D', this.selectarray,
        console.log(this.selectarray);
    },
    genre5() {
      this.selectarray.push('SF');
      return this.type = 'D', this.selectarray,
        console.log(this.selectarray);
    },
    genre6() {
      this.selectarray.push('판타지');
      return this.type = 'D', this.selectarray,
        console.log(this.selectarray);
    },
    genre7() {
      this.selectarray.push('스릴러');
      return this.type = 'D', this.selectarray,
        console.log(this.selectarray);
    },
    genre8() {
      this.selectarray.push('다큐멘터리');
      return this.type = 'D', this.selectarray,
        console.log(this.selectarray);
    },

    //4차 필터
    feel1() {
      this.selectarray.push('사랑중이에요');
      return this.type = 'E', this.selectarray,
        console.log(this.selectarray)
    },
    feel2() {
      this.selectarray.push('우울해요');
      return this.type = 'E', this.selectarray,
        console.log(this.selectarray)
    },
    feel3() {
      this.selectarray.push('이별했어요');
      return this.type = 'E', this.selectarray,
        console.log(this.selectarray)
    },
    feel4() {
      this.selectarray.push('고민있어요');
      return this.type = 'E', this.selectarray,
        console.log(this.selectarray)
    },
    feel5() {
      this.selectarray.push('행복해요');
      return this.type = 'E', this.selectarray,
        console.log(this.selectarray)
    },
    feel6() {
      this.selectarray.push('심심해요');
      return this.type = 'E', this.selectarray,
        console.log(this.selectarray)
    },
    feel7() {
      this.selectarray.push('떠나고싶어요');
      return this.type = 'E', this.selectarray,
        console.log(this.selectarray)
    },
    feel8() {
      this.selectarray.push('화나요');
      return this.type = 'E', this.selectarray,
        console.log(this.selectarray)
    },
    feel9() {
      this.selectarray.push('힐링이필요해요');
      return this.type = 'E', this.selectarray,
        console.log(this.selectarray)
    },
    feel10() {
      this.selectarray.push('배고파요');
      return this.type = 'E', this.selectarray,
        console.log(this.selectarray)
    },

    // 필터 종합
    filtercancel(){
      location.href = "/Filtering";
    },
    filterconfirm(){
      this.$router.push({ path: "/FinalFilter"});
    }
  }
};
</script>
