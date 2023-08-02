<template>
  <div>
    <div class="background">
      <form class="bg2" @submit.prevent="">
        <div class="logtitle">
          <div class="formtitle">아이디 찾기</div>
          <div class="form">
            <div class="form1">
              <div style="margin-top: 45px; margin-left: 10px">
                <div class="inputid">
                  <span class="label">휴대폰번호</span>
                  <input
                    class="input"
                    type="email"
                    name="username"
                    placeholder="휴대폰 번호를 입력하세요"
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
                      height: 50px;
                      width: 80px;
                      margin-top: 23px;
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
