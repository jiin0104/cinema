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
          <v-list-item @click="$router.push('/')" prepend-icon="mdi-logout" title="로그아웃" value="logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100px; background-color: black;">
        <div class="d-flex justify-center align-center h-100" style="margin-right: 400px;">
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
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
    }
  },
  methods: {

  },
}
</script>

<style scoped>
.header {
  position: relative;
  margin-right: 300%;
}
</style>
