<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">비밀번호 찾기</div>
          <div class="form">
            <div class="form1">
              <div style="margin-top: 6px">
                <div class="inputid">
                  <span class="label">아이디</span>
                  <input
                    class="input"
                    type="email"
                    name="username"
                    placeholder="아이디를 입력하세요"
                    required
                  />
                </div>
                <div class="inputpw">
                  <span class="label">휴대폰번호</span>
                  <input
                    class="input"
                    type="password"
                    name="pass"
                    placeholder="휴대폰 번호를 입력하세요"
                    autocomplete="off"
                    required
                  />
                </div>
                <div style="margin-left: 365px">
                  <v-btn
                    class="infotext"
                    variant="tonal"
                    style="
                      color: white;
                      background-color: rgb(57, 103, 255);
                      height: 160px;
                      width: 105px;
                    "
                  >
                    확인
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
