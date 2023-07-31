<template>
  <div>
    <div class="background">
      <!-- 좌상단 로고 -->
      <v-container class="header">
        wavecinema
      </v-container><br>
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">로그인 후 추천받은 목록을 기록해보세요!</div>
          <div class="form">
            <div class="form1">
              <div style="margin-top: 6px;">
                <div class="inputid">
                  <span class="label">아이디</span>
                  <input class="input" type="email" name="username" placeholder="이메일을 입력하세요" required />
                </div>
                <div class="inputpw">
                  <span class="label">비밀번호</span>
                  <input class="input" type="password" name="pass" placeholder="비밀번호를 입력하세요" autocomplete="off"
                    required />
                </div>
                <div style="margin-left: 365px;">
                  <v-btn class="infotext" variant="tonal"
                    style="color: white; background-color: rgb(57, 103, 255); height: 160px; width: 105px;">
                    확인
                  </v-btn>
                </div>
              </div>
            </div>
            <div class="form2">
              <v-btn class="infotext" variant="text" style="color: white;">
                아이디찾기
              </v-btn>
              <v-btn class="infotext" variant="text" style="color: white;">
                비밀번호찾기
              </v-btn>
              <v-btn class="infotext" variant="text" style="color: white;">
                회원가입
              </v-btn>
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