<template>

  <!-- 로그인 상태일 경우 -->

  <v-card v-if="isLogin">
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item prepend-icon="mdi-menu" title="더보기 메뉴"></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item @click="$router.push('/')" prepend-icon="mdi-home" title="홈" value="/"></v-list-item>
          <v-list-item @click="$router.push('/mypage')" prepend-icon="mdi-account" title="내정보" value="mypage"></v-list-item>
          <v-list-item @click=Logout prepend-icon="mdi-logout" title="로그아웃" value="logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100px; background-color: black;">
        <div class="d-flex justify-center align-center h-100" style="float: right; margin-right: 45%;">
          <div class="d-flex justify-center align-center h-100 header"><img src="logo.png"
              style="width: 200px; height: 50px" />
          </div>
          <v-btn color="primary" @click.stop="drawer = !drawer">
            더보기
          </v-btn>
        </div>
      </v-main>
    </v-layout>
  </v-card>

  <!-- 비회원 상태일 경우 -->

  <v-card v-else>
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item prepend-icon="mdi-menu" title="더보기 메뉴"></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item @click="$router.push('/')" prepend-icon="mdi-home" title="홈" value="/"></v-list-item>
          <v-list-item @click="$router.push('/login')" prepend-icon="mdi-login" title="로그인" value="login"></v-list-item>
        </v-list>

      </v-navigation-drawer>
      <v-main style="height: 100px; background-color: black;">
        <div class="d-flex justify-center align-center h-100" style="float: right; margin-right: 45%;">
          <div class="d-flex justify-center align-center h-100 header"><a href="/"><img src="logo.png"
              style="width: 200px; height: 50px" /></a>
          </div>
          <v-btn color="primary" @click.stop="drawer = !drawer">
            더보기
          </v-btn>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      drawer: null,
    }
  },
  computed: {
    ...mapState(['isLogin', 'userId'])
  },
  methods: {
    Logout() {
        // store에 담긴 유저 정보의 data를 null값으로 만듦
        this.$store.commit("localUser", {});
        this.$swal("로그아웃 되었습니다.");
        this.$router.push({path:'/'}); // 로그아웃 이후 메인 페이지로 라우팅
        this.$store.commit('logOut') // 로그아웃 이후 헤더 게스트로 변환
      }
    }
  }


</script>

<style scoped>
.header {
  position: relative;
  margin-right: 300%;
}
</style>
