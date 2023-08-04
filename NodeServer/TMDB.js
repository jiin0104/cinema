//장르별로 영화 뽑아오기
// const axios = require("axios");
// const options = {
//   method: "GET",

//예시 url https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=49ba50092811928efb84febb9d68823f

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

// // 장르 번호들
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
// // ]}

//뽑아온 영화 디테일 가져오기
// const axios = require('axios');
// const options = {
//   method: 'GET',

//예시 url https://api.themoviedb.org/3/movie/1083862?api_key=49ba50092811928efb84febb9d68823f

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

const dbPool = require("/db.js");

// JSON 데이터를 MySQL 데이터베이스에 저장하는 함수
function saveJSONDataToDatabase(jsonData) {
  const connection = dbPool.getConnection((err, connection) => {
    const query = "INSERT INTO movie_info (data) VALUES (?)";
    const jsonDataString = JSON.stringify(jsonData);

    connection.query(query, [jsonDataString], (err, results) => {
      if (err) {
        console.error("데이터 삽입 중 에러가 발생했습니다:", err);
      } else {
        console.log("데이터 삽입이 성공적으로 완료되었습니다.");
      }
      connection.release();
    });
  });
}

// 예시: JSON 데이터를 받아와서 데이터베이스에 저장하기 const jsonURL = "https://api.themoviedb.org/3/discover/movie?api_key=49ba50092811928efb84febb9d68823f";

axios
  .get(jsonURL)
  .then((response) => response.data)
  .then((jsonData) => saveJSONDataToDatabase(jsonData))
  .then(console.log)
  .catch((err) =>
    console.error("JSON 데이터를 가져오는 도중 에러가 발생:", err)
  );


  
//
  const express = require('express');
const axios = require('axios');
const app = express();

// 다른 설정과 미들웨어 등을 정의...

app.get('/fetch-movies', async (req, res) => {
  try {
    // FilteringR.vue에서 전달한 데이터 받기
    const { selectedGenres, selectedImage } = req.query;

    const apiKey = 'YOUR_TMDB_API_KEY';
    const genreQueryString = selectedGenres.join(',');
    
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=vote_count.desc&with_genres=${genreQueryString}`;

    const options = {
      method: 'GET',
      url: apiUrl,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    };
    
    const response = await axios.request(options);
    const movies = response.data.results;

    // 가져온 영화 정보를 활용하여 다음 작업 수행

    res.json({ message: 'Movies fetched and processed.' });
  } catch (error) {
    console.error('Error fetching and processing movies:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching and processing movies.' });
  }
});

// 다른 라우트 및 설정 등 추가...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
