const axios = require("axios");

const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/movie?with_genres=장르번호(후에 여기에 vue에서 장르필터링 버튼을 누르면 버튼에 저장된 장르 번호가 여기에 들어가게 해야됨)&api_key=49ba50092811928efb84febb9d68823f",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWNmNjhiMGNmOGY1OGE0ZTQ4YzczNGI5ZGYyZGQ5ZiIsInN1YiI6IjY0YmUwOTU1MGVkMmFiMDBmZjg3NWNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4mpSNxX0V7zyzOH-PJwXskAMWGFeOdtthnXRKyMFe58",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

//장르 번호들
  {"genres":[
  {"id":28,"name":"Action"},
  {"id":12,"name":"Adventure"},
  {"id":16,"name":"Animation"},
  {"id":35,"name":"Comedy"},
  {"id":80,"name":"Crime"},
  {"id":99,"name":"Documentary"},
  {"id":18,"name":"Drama"},
  {"id":10751,"name":"Family"},
  {"id":14,"name":"Fantasy"},
  {"id":36,"name":"History"},
  {"id":27,"name":"Horror"},
  {"id":10402,"name":"Music"},
  {"id":9648,"name":"Mystery"},
  {"id":10749,"name":"Romance"},
  {"id":878,"name":"Science Fiction"},
  {"id":10770,"name":"TV Movie"},
  {"id":53,"name":"Thriller"},
  {"id":10752,"name":"War"},
  {"id":37,"name":"Western"}
]}