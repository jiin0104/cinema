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
                <span class="idlabel">아이디</span>
                <input class="input" type="email" name="username" placeholder="이메일을 입력하세요" required />
              </div>
              <div class="logpw">
                <span class="pwlabel">비밀번호</span>
                <input class="input" type="password" name="pass" placeholder="비밀번호를 입력하세요" autocomplete="off"
                  required />
              </div>
            </div>
            <ul class="form2">
              <li>아이디 찾기</li>
              <li>비밀번호 찾기</li>
              <li>회원가입</li>
            </ul>
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