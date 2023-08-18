const express = require("express");
const router = express.Router();
const dbPool = require("../db");
const mysql = require("mysql2/promise"); // MySQL2 Promise 래퍼

//FilterR.vue에서 받은 장르값을 movies 테이블에 적용 시켜서 뽑아오고,뽑아온 영화 4개를 recommend테이블에 넣어주고, Recommend.vue로 보내주기
router.post("/filtervalues", async (request, res) => {
  try {
    const formData = request.body; // 클라이언트에서 보낸 데이터 받아오기
    const selectGenres = formData.selectedGenres; // 선택한 장르 배열
    const emojiFileNames = [formData.e1, formData.e2, formData.e3, formData.e4]; // 이미지 파일명 4개
    console.log(formData);
    console.log(selectGenres);
    console.log(emojiFileNames);

    // 데이터베이스 연결 생성
    const connection = await dbPool.promise();

    // 1차적으로 첫 번째 장르를 이용한 필터링
    const firstGenreQuery = `
     SELECT MOVIE_NUM FROM movies WHERE
     GENRE1 = ? OR GENRE2 = ? OR GENRE3 = ? OR GENRE4 = ?
   `;
    const [firstFilteredMovies] = await connection.query(firstGenreQuery, [
      selectGenres[0],
      selectGenres[0],
      selectGenres[0],
      selectGenres[0],
    ]);

    // 2차적으로 두 번째 장르를 이용한 필터링
    const secondGenreQuery = `
      SELECT MOVIE_NUM FROM movies WHERE
      (GENRE1 = ? OR GENRE2 = ? OR GENRE3 = ? OR GENRE4 = ?) AND
      MOVIE_NUM IN (?)  ORDER BY RAND() LIMIT 4
    `;
    const [filteredMovies] = await connection.query(secondGenreQuery, [
      selectGenres[1],
      selectGenres[1],
      selectGenres[1],
      selectGenres[1],
      firstFilteredMovies.map((movie) => movie.MOVIE_NUM),
    ]);

    // 선택된 4개 영화의 무비넘들
    const selectedMovieNums = filteredMovies.map((movie) => movie.MOVIE_NUM);

    // 이미지 파일명 배열을 JSON 형식으로 변환
    const emojiFileNamesJSON = JSON.stringify(emojiFileNames);

    // recommend 테이블에 데이터 삽입
    const insertQuery = `
    INSERT INTO recommend (USER_NUM, MOVIE_NUM1, MOVIE_NUM2, MOVIE_NUM3, MOVIE_NUM4, EMOJI)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
    const values = [
      formData.userNo,
      selectedMovieNums[0],
      selectedMovieNums[1],
      selectedMovieNums[2],
      selectedMovieNums[3],
      emojiFileNamesJSON,
    ];

    // 쿼리 실행 후 연결 닫기
    await connection.query(insertQuery, values);
  } catch (error) {
    console.error("무언가 문제가 있다", error);
    res.status(500).send({
      message: "무언가 문제가 있다",
    });
  }
});

module.exports = router;
