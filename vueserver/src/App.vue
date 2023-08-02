<template>
  <Header/>
    <router-view/>

</template>

<script>
import Header from './layout/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data: () => ({
    //
  }),
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Dokdo&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Dokdo&display=swap');
</style>