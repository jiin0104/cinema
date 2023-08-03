<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">당신에게 추천드리는 영화예요!</div>
          <!--카드-->
          <div
            v-for="rec in slides"
            :key="rec.id"
            style="
              position: relative;
              left: 140px;
              margin: 5px;
              display: inline-block;
            "
          >
            <v-layout>
              <v-card>
                <v-img :src="rec.url" height="250px" width="220px"> </v-img>

                <div class="r_title">
                  <div>
                    <div class="headline">{{ rec.title }}</div>
                  </div>
                </div>

                <div class="detail">
                  <button @click="handle_toggle()">상세보기</button>
                </div>
              </v-card>
            </v-layout>
          </div>
          <!--카드 끝-->

          <!--모달창-->
          <div v-show="is_show" class="modal">
            <div style="display: flex; align-items: center">
              <v-img src="al.jpg" height="200px" width="190px"> </v-img>
              <div>
                <div style="font-size: 40px; margin-left: 50px">
                  <strong>알라딘</strong>
                </div>
                <div style="margin: 5px">
                  <p>장르: 판타지, 로맨스</p>
                  <p>러닝타임: 128분</p>
                  <p>감독: 가이 리치</p>
                  <p>주연: 미나 마수드, 나오미 스콧, 윌 스미스</p>
                </div>
              </div>
            </div>
            <div>
              <div style="margin: 10px">평점</div>
              <div style="margin: 10px">
                <form>
                  한줄리뷰
                  <div class="review">
                    이름: 재밌어요<br />이름2: 주인공 예뻐요
                    테스테스트세트세트세트테스트세트스테스트
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
      model: 0,
      slides: [
        { id: 1, title: "알라딘", url: "/al.jpg" },
        { id: 2, title: "바빌론", url: "/va.jpg" },
        { id: 3, title: "라라랜드", url: "/lalaland.jpg" },
        { id: 4, title: "바빌론", url: "/va.jpg" },
      ],
    };
  },
  methods: {
    pageLink() {
      this.$router.push({ path: "/" });
    },

    handle_toggle() {
      this.is_show = !this.is_show;
    },
  },
};
</script>

<style>
@import "../css/recommend.css";

.modal {
  background-color: #d9d9d9;
  width: 400px;
  height: 470px;
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
</style>
