<template>
    <body class="background" style="height: 1400px;">
        <!-- 좌상단 로고 -->
        <form id="app2" @submit="checkForm" action="/signup" method="post" novalidate="true">
            <div class="signtitle">
                <div class="signform" style="padding-top: 3%; padding-bottom: 3%; max-width: 465px;">
                    <div class="signform1">
                        <div class="contact-text">
                            <div class="title">내 정보</div>

                            <div class="field2" id="sign">
                                <span label for="email">이메일(아이디)</span><br>
                                {{ userinfo.USER_ID }}

                                <br /><br />
                            </div>

                            <div class="field2" id="sign">
                                <span label for="nickname">닉네임</span><br />
                                {{ userinfo.USER_NICKNAME }}
                            </div>


                            <div class="field2 tel-number">
                                <span label for="phone">휴대전화(-제외)</span>
                                {{ userinfo.USER_TEL }}
                            </div>

                            <div class="field2">
                                <span label for="address">주소</span><br />
                                {{ userinfo.USER_ADDRESS1 }} <br>
                                {{ userinfo.USER_ADDRESS2 }}
                            </div>

                            <div class="field2">
                                <span label for="age">연령대</span><br />
                                {{ userinfo.USER_AGE }}
                            </div>

                            <div class="field2">
                                <span label for="sex">성별</span><br>
                                {{ userinfo.SEX }}
                            </div>

                            <div class="field2">
                                <span label for="genre">선호하는 장르</span><br />
                                {{ userinfo.GENRE }}
                            </div>


                            <div style="position: relative; text-align: center;" class="signUp">
                                <input type="submit" id="addallow" value="수정하기" variant="tonal"
                                    style="color: white; background-color: rgb(57, 103, 255); min-height: 30px; min-width: 75px;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main" style="width: 20%"></div>
        </form>
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
        this.Get_User_Info();
    },

    methods: {
        async Get_User_Info() {
            let userinfo = await this.$api("/api/userinfo", { param: [this.$store.state.userId] });
            this.userinfo = userinfo[0];
        }
    }



}
</script>
  