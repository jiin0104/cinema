<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">당신을 분석중입니다</div>
          <div class="form">
            <div class="container">
              <div class="row rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>

              <div class="row2 rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
              <div class="row3 rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
              <div class="row4 rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
              <div class="row5 rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
              <div class="row6 rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
              <div class="row7 rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
              <div class="row8 rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
              <div class="row9 rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
              <div class="row10 rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
              <div class="row11 rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
              <div class="row12 rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
              <div class="row13 rowc">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
            </div>
            <div class="ocean">
              <div class="wave"></div>
              <div class="wave"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logo: "logo.png",
    };
  },
  methods: {
    //분석페이지 자동페이징전환
    delayRedirect() {
      setTimeout(() => {
        this.$router.push("/Recommend");
      }, 3000); // 3000ms = 3s
    },
  },
  mounted() {
    this.delayRedirect();
  },
};
</script>

<style>
@import "../css/filtering.css";

</style>
