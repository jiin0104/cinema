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

/* 점 */

.circle {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: #1e90ff;
  margin-bottom: 80px;
}

.container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.rowc {
  display: inline-block;
  margin-left: 2px;
}

.c1 {
  animation: c1 1.5s linear infinite;
}

.c2 {
  animation: c2 1.5s linear infinite;
  background-color: #3fd1ff;
}

@keyframes c1 {
  0% {
    transform: translateY(0px) scale(1);
  }
  25% {
    transform: translateY(12px) scale(1.5);
    background-color: #0c87ff;
    z-index: 10;
  }
  50% {
    transform: translateY(34px) scale(1);
  }
  75% {
    transform: translateY(12px) scale(0.6);
    background-color: #3a9eff;
    z-index: 1;
    opacity: 0.1;
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}

@keyframes c2 {
  0% {
    transform: translateY(0px) scale(1);
  }
  25% {
    transform: translateY(-12px) scale(0.6);
    background-color: #75deff;
    z-index: 1;
    opacity: 0.1;
  }
  50% {
    transform: translateY(-34px) scale(1);
  }
  75% {
    transform: translateY(-12px) scale(1.5);
    background-color: #0fc3ff;
    z-index: 10;
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}

.row2 .c1 {
  animation-delay: 0.1s;
}
.row2 .c2 {
  animation-delay: 0.1s;
}
.row3 .c1 {
  animation-delay: 0.22s;
}
.row3 .c2 {
  animation-delay: 0.22s;
}
.row4 .c1 {
  animation-delay: 0.37s;
}
.row4 .c2 {
  animation-delay: 0.37s;
}
.row5 .c1 {
  animation-delay: 0.49s;
}
.row5 .c2 {
  animation-delay: 0.49s;
}
.row6 .c1 {
  animation-delay: 0.67s;
}
.row6 .c2 {
  animation-delay: 0.67s;
}
.row7 .c1 {
  animation-delay: 0.89s;
}
.row7 .c2 {
  animation-delay: 0.89s;
}
.row8 .c1 {
  animation-delay: 0.95s;
}
.row8 .c2 {
  animation-delay: 0.95s;
}
.row9 .c1 {
  animation-delay: 1.2s;
}
.row9 .c2 {
  animation-delay: 1.2s;
}
.row10 .c1 {
  animation-delay: 1.45s;
}
.row10 .c2 {
  animation-delay: 1.45s;
}
.row11 .c1 {
  animation-delay: 1.62s;
}
.row11 .c2 {
  animation-delay: 1.62s;
}
.row12 .c1 {
  animation-delay: 1.88s;
}
.row12 .c2 {
  animation-delay: 1.88s;
}
.row13 .c1 {
  animation-delay: 2s;
}
.row13 .c2 {
  animation-delay: 2s;
}

/* 파도 */
html,
body {
  height: 100%;
}
body {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 254, 234, 1) 0%,
    rgba(255, 254, 234, 1) 35%,
    #b7e8eb 100%
  );
}

.ocean {
  height: 15%;
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0;
  background: #015871;
}

.wave {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg)
    repeat-x;
  position: absolute;
  top: -198px;
  width: 6400px;
  height: 250px;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

.wave:nth-of-type(2) {
  top: -175px;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
    swell 7s ease -1.25s infinite;
  opacity: 1;
}

@keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}

@keyframes swell {
  0%,
  100% {
    transform: translate3d(0, -25px, 0);
  }
  50% {
    transform: translate3d(0, 5px, 0);
  }
}
</style>
