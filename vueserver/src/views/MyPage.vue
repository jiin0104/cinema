<template>
    <body class="mybackground">
        <!-- 좌상단 로고 -->

            <div class="mytitle">
                <div class="myform" style="padding-top: 3%; padding-bottom: 3%;">
                    <div class="myform1">
                        <div class="contact-text">
                            <div class="title">내 정보</div>

                            <div class="myfield" id="my">
                                <span label for="email">이메일(아이디)</span><br>
                                {{ userinfo.USER_ID }}
                                <br /><br />
                            </div>

                            <div class="myfield" id="my">
                                <span label for="nickname">닉네임</span><br />
                                {{ userinfo.USER_NICKNAME }}
                                <br /><br />
                            </div>


                            <div class="myfield tel-number">
                                <span label for="phone">휴대전화(-제외)</span><br>
                                {{ userinfo.USER_TEL }}
                                <br /><br />
                            </div>

                            <div class="myfield">
                                <span label for="address">주소</span><br />
                                {{ userinfo.USER_ADDRESS1 }} <br>
                                {{ userinfo.USER_ADDRESS2 }}
                                <br /><br />
                            </div>

                            <div class="myfield">
                                <span label for="age">연령대</span><br />
                                {{ userinfo.USER_AGE }}
                                <br /><br />
                            </div>

                            <div class="myfield">
                                <span label for="sex">성별</span><br>
                                {{ userinfo.SEX }}
                                <br /><br />
                            </div>

                            <div class="myfield">
                                <span label for="genre">선호하는 장르</span><br />
                                {{ userinfo.GENRE }}
                                <br /><br />

                            </div>


                            <div style="position: relative; text-align: center;" class="myUp">
                                <input type="button" id="addallow" value="수정하기" variant="tonal" @click="mypage_update"
                                    style="color: white; background-color: rgb(57, 103, 255); min-height: 30px; min-width: 75px;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main" style="width: 20%"></div>

    </body>
</template>

<style>
@import "../css/mypage.css";
</style>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000"; //프록시 서버
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
    data() {
        return {
            userinfo: {},
        };
    },

    created() {
        this.Get_user();
    },

    methods: {
        async Get_user() {
            let userinfo = await this.$api("/api/userin", { param: [this.$store.state.userId] });
            this.userinfo = userinfo[0];
            console.log(this.$store.state.isLogin);
            console.log(this.$store.state.userId)
        },
        mypage_update() {
      this.$router.push({ path: "/mypage_update" });
    },
    }



}
</script>
