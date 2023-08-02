<template>
  <div>
    <div class="background">
      <div class="filter">
        <div class="title">연령대는?</div>
        <br /><br />
        <!--2차 선택창-->
        <div class="select">
          <br />
          <div style="display: grid; position: relative; left: 100px">
            <div class="buttonlocation1">
              <button type="button" class="button3">어린이</button>
              <div>
                <button type="button" class="button3">10대</button>
              </div>
            </div>

            <div class="buttonlocation1">
              <div>
                <button type="button" class="button3">20대</button>
              </div>
              <div>
                <button type="button" class="button3">30대</button>
              </div>
            </div>
            <div class="buttonlocation1">
              <div>
                <button type="button" class="button3">40대</button>
              </div>
              <div>
                <button type="button" class="button3">50대</button>
              </div>
            </div>
            <div class="buttonlocation1">
              <div>
                <button type="button" class="button3">60대</button>
              </div>
              <div>
                <button type="button" class="button3">70대+</button>
              </div>
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
    return {
      buttonImage1: "woman.png",
      buttonImage2: "man.png",
    };
  },
};
</script>
