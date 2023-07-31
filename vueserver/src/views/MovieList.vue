<template>
  <div>
    <h1>영화 목록</h1>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }} ({{ movie.genre }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    fetchMovies() {
      // Node.js 서버에서 영화 목록을 가져옴
      fetch("/api/movies")
        .then((response) => response.json())
        .then((data) => {
          this.movies = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
