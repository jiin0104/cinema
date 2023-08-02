<template>
  <div>
    <div class="background">
      <div class="filter">
        <div class="title">선호하는 장르는?</div>
        <br /><br />
        <!--2차 선택창-->
        <div class="select">
          <br />
          <div class="buttonlocation3">
            <button type="button" class="button4" style="font-size: 27px">
              애니메이션
            </button>
            <div>
              <button type="button" class="button4">액션</button>
            </div>
          </div>
          <div class="buttonlocation3">
            <div>
              <button type="button" class="button4">로맨스</button>
            </div>
            <div>
              <button type="button" class="button4">코미디</button>
            </div>
          </div>
          <div class="buttonlocation3">
            <div>
              <button type="button" class="button4">SF</button>
            </div>
            <div>
              <button type="button" class="button4">판타지</button>
            </div>
          </div>
          <div class="buttonlocation3">
            <div>
              <button type="button" class="button4">스릴러</button>
            </div>
            <div>
              <button type="button" class="button4" style="font-size: 27px">
                다큐멘터리
              </button>
              <button type="button" class="button4" style="font-size: 27px">
                전쟁
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--2차 선택창 끝-->
    </div>
  </div>
</template>

<style>
@import "../css/filtering.css";
</style>

<script>
export default {
  data() {
    return {};
  },
};
</script>
