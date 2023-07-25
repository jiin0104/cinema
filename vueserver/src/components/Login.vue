<template>
  <div>
    <div class="background">
      <!-- 좌상단 로고 -->
      <v-container class="header">
        wavecinema
      </v-container><br>
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="form">
            <div class="form1">
              <div class="logid">
                <span class="label">아이디</span>
                <input class="input" type="email" name="username" placeholder="이메일을 입력하세요" required />
              </div>
              <div class="logpw">
                <span class="label">비밀번호</span>
                <input class="input" type="password" name="pass" placeholder="비밀번호를 입력하세요" autocomplete="off" required />
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
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Dokdo&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Dokdo&display=swap');

@import "../css/login.css";
</style>