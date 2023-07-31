<template>
  <div>
    <div class="background">
      <!-- 좌상단 로고 -->
      <v-container class="header"> wavecinema </v-container><br />
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">비밀번호 재설정</div>
          <div class="form">
            <div class="findpwform">
              <div style="margin-top: 20px; font-size: 25px">
                <div class="inputpw">
                  <span class="label">새로운 비밀번호</span>
                  <input
                    class="input"
                    type="password"
                    name="pass"
                    placeholder="비밀번호를 입력하세요"
                    autocomplete="off"
                    required
                  />
                </div>
                <div class="inputpw">
                  <span class="label">새로운 비밀번호 확인</span>
                  <input
                    class="input"
                    type="password"
                    name="pass"
                    placeholder="비밀번호를 입력하세요"
                    autocomplete="off"
                    required
                  />
                </div>
                <div>
                  <v-btn
                    class="infotext"
                    variant="tonal"
                    style="
                      color: white;
                      background-color: rgb(57, 103, 255);
                      height: 50px;
                      width: 80px;
                      position: relative;
                      top: 137px;
                      margin: 10px;
                    "
                  >
                    변경
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@import "../css/login.css";
</style>
