const express = require("express");
const cors = require("cors");
const dbPool = require("./db.js"); //db가 필요한 작업에서 끌어다 쓸 변수 정의.
const axios = require("axios");
let sql = require("./sql.js");

//익스프레스 객체
const app = express();

//콜스 설정
let corsOption = {
  origin: "http://localhost:8080", // 접근 권한 부여 도메인
  credentials: true, //true로 하면 설정한 내용을 response 헤더에 추가 해줌.
  optionsSuccessStatus: 200, //응답 상태 200으로 설정
};
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors(corsOption)); //CORS 미들웨어

//express 서버로 POST 요청을 할 때 input 태그의 value를 전달하기 위해 사용
//post 방식으로 클라이언트가 요청하는 본문에 있는 value를 넘겨받고 req.body 객체로 만들어주는 미들웨어.
//넘겨받은 value들은 DB로 전송
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const authRouter = require('./routes/auth.js');
// const movieRouter = require('./routes/movie');
// const mypageRouter = require('./routes/mypage');
// const userRouter = require('./routes/user');

app.use('/auth', authRouter);
// app.use('/movie', movieRouter);
// app.use('/mypage', mypageRouter);
// app.use('/user', userRouter);

//라우터 목록
// 예시 const mypageRouter = require('./Routers/mypage');
//app.use('/mypage', mypageRouter);
// const 엔드포인트로직의메소드명 = require("./Routers/라우터폴더의js파일명");
// app.use("/우리가쓸엔드포인트", 엔드포인트로직의메소드명);

// req 객체 생성, DB 연동
const req = {
  async db(alias, param = [], where = "") {
    return new Promise((resolve, reject) =>
      dbPool.query(sql[alias].query + where, param, (error, rows) => {
        if (error) {
          if (error.code != "ER_DUP_ENTRY") console.log(error);
          resolve({
            error,
          });
        } else resolve(rows);
      })
    );
  },
};

//=======================================================================================================================================================//
//=======================================================================================================================================================//
//=======================================================================================================================================================//
//=======================================================================================================================================================//
//=======================================================================================================================================================//



//=======================================================================================================================================================//
//=======================================================================================================================================================//
//=======================================================================================================================================================//
//=======================================================================================================================================================//
//=======================================================================================================================================================//

//TMDB api 이용해서 db에 영화 json데이터 넣기
app.post("/fetch-movies", async (req, res) => {
  try {
    // FilteringR.vue에서 전달한 데이터 받기
    const selectedGenres = req.body.selectedGenres;
    //받아온 데이터를 api에 적용해서 영화 json데이터 url 만들기
    const apiKey = "49ba50092811928efb84febb9d68823f";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&with_genres=${selectedGenres.join(
      ","
    )}&api_key=${apiKey}`;

    const options = {
      method: "GET",
      url: apiUrl,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    //url에서 받아온 json데이터
    const response = await axios.request(options);

    const movies = response.data.results;
    // 가져온 영화 정보를 db에 저장
    // for (const movie of movies) {
    //   const movieInfo = JSON.stringify(movie); // JSON 데이터를 문자열로 변환
    //   const [rows, fields] = await dbPool
    //     .promise()
    //     .query("INSERT INTO jsontest (movie_info) VALUES (?)", [[movieInfo]]);
    // }
    for (const movie of movies) {
      const movieId = movie.id; // 영화의 고유 id
      const movieInfo = JSON.stringify(movie); // JSON 데이터를 문자열로 변환

      // movies_db 테이블에 해당 movieId가 이미 존재하는지 확인하는 쿼리문
      const duplicateCheckQuery =
        "SELECT COUNT(*) as count FROM movies_db WHERE movieid = ?";
      const [duplicateCheckRows] = await dbPool
        .promise()
        .query(duplicateCheckQuery, [movieId]);
      const isDuplicate = duplicateCheckRows[0].count > 0;

      if (!isDuplicate) {
        // movies_db 테이블에 영화 정보 추가
        const insertQuery =
          "INSERT INTO movies_db (movieid, movieinfo) VALUES (?, ?)";
        await dbPool.promise().query(insertQuery, [movieId, movieInfo]);
      }
    }

    // console.log를 사용하여 데이터 확인
    console.log("Selected genres:", selectedGenres);
    console.log(apiUrl);

    res.json({ message: "Movies fetched and processed." });
  } catch (error) {
    console.error("Error fetching and processing movies:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching and processing movies.",
    });
  }
});

//db에 저장된 포스터패스를 TMDB api이용해서 url받고 프론트로 쏴줌
app.post("/recommend-movies", async (req, res) => {
  try {
    // FilteringR.vue에서 전달한 데이터 받기
    const selectedGenres = req.body.selectedGenres;

    // db에서 해당 장르에 맞는 영화를 랜덤하게 4개 선택
    const query = `
      SELECT movieid
      FROM movies_db
      WHERE JSON_CONTAINS(movieinfo->'$.genre_ids', ?)
      ORDER BY RAND()
      LIMIT 4;
    `;

    const [rows, fields] = await dbPool
      .promise()
      .query(query, [JSON.stringify(selectedGenres)]);

    // 선택된 영화들의 id값 배열
    const selectedMovieIds = rows.map((row) => row.movieid);

    // 각 영화의 포스터 URL 가져오기
    const apiKey = "49ba50092811928efb84febb9d68823f";
    const baseImageUrl = "https://image.tmdb.org/t/p/";
    const posterSize = "w500"; // 원하는 이미지 크기
    //랜덤으로 뽑아온 4개 영화id로 영화 json정보 뽑아오기
    const movieDetailsPromises = selectedMovieIds.map(async (movieId) => {
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
      //뽑아온 json에서 이미지뽑기
      try {
        const response = await axios.get(apiUrl);
        const movieData = response.data;

        // 영화 포스터 이미지 URL 생성
        const posterPath = movieData.poster_path;
        const posterUrl = `${baseImageUrl}${posterSize}${posterPath}`;

        return {
          movieid: movieId,
          posterUrl: posterUrl,
        };
      } catch (error) {
        console.error("Error fetching movie details from TMDB:", error);
        return null;
      }
    });

    //추천된 영화의 상세 정보 배열
    const moviePosters = await Promise.all(movieDetailsPromises);
    // console.log를 사용하여 데이터 확인
    console.log("포스터엔드포인트에서 받은 장르값:", selectedGenres);
    console.log("선택된 영화들의 id값 배열", selectedMovieIds);
    console.log("포스터엔드포인트에서 생성한 4개 랜덤영화 뽑기 쿼리", query);
    console.log("포스터엔드포인트에서 뽑아온 4개 랜덤영화 정보", moviePosters);

    res.status(200).json(moviePosters);
  } catch (error) {
    console.error("Error recommending movies:", error);
    res
      .status(500)
      .json({ error: "An error occurred while recommending movies" });
  }
});

// 다른 라우트 및 설정 등 추가

// 서버 실행
app.listen(3000, () => {
  console.log("port 3000에서 서버구동");
});

module.exports = dbPool;
