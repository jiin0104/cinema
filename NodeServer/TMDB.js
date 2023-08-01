//장르별로 영화 뽑아오기
// const axios = require("axios");
// const options = {
//   method: "GET",
//   url: "https://api.themoviedb.org/3/discover/movie?with_genres=장르번호(후에 여기에 vue에서 장르필터링 버튼을 누르면 버튼에 저장된 장르 번호가 여기에 들어가게 해야됨)&api_key=49ba50092811928efb84febb9d68823f",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWNmNjhiMGNmOGY1OGE0ZTQ4YzczNGI5ZGYyZGQ5ZiIsInN1YiI6IjY0YmUwOTU1MGVkMmFiMDBmZjg3NWNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4mpSNxX0V7zyzOH-PJwXskAMWGFeOdtthnXRKyMFe58",
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

//장르 번호들
//   {"genres":[
//   {"id":28,"name":"Action"},
//   {"id":12,"name":"Adventure"},
//   {"id":16,"name":"Animation"},
//   {"id":35,"name":"Comedy"},
//   {"id":80,"name":"Crime"},
//   {"id":99,"name":"Documentary"},
//   {"id":18,"name":"Drama"},
//   {"id":10751,"name":"Family"},
//   {"id":14,"name":"Fantasy"},
//   {"id":36,"name":"History"},
//   {"id":27,"name":"Horror"},
//   {"id":10402,"name":"Music"},
//   {"id":9648,"name":"Mystery"},
//   {"id":10749,"name":"Romance"},
//   {"id":878,"name":"Science Fiction"},
//   {"id":10770,"name":"TV Movie"},
//   {"id":53,"name":"Thriller"},
//   {"id":10752,"name":"War"},
//   {"id":37,"name":"Western"}
// ]}

//뽑아온 영화 디테일 가져오기
// const axios = require('axios');
// const options = {
//   method: 'GET',
//   url: 'https://api.themoviedb.org/3/movie/영화의고유아이디번호(후에추천해준영화의포스터를 누르면 그 영화의 아이디번호를 여기에다가 넣어줘야됨.)?api_key=49ba50092811928efb84febb9d68823f',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWJhNTAwOTI4MTE5MjhlZmI4NGZlYmI5ZDY4ODIzZiIsInN1YiI6IjY0YmUwOTU1MGVkMmFiMDBmZjg3NWNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.969pjkN22WxAQNCe-bh5feUqeoJVrntH4H_fgpIDwuk'
//   }
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
