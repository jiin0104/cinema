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

    //선택한 장르를 이용하기 위해서 장르를 or이용해서 매칭
    const genresQuery = selectGenres
      .map(
        (genre) =>
          `GENRE1 = '${genre}' OR GENRE2 = '${genre}' OR GENRE3 = '${genre}' OR GENRE4 = '${genre}'`
      )
      .join(" OR ");

    //무비즈 테이블에서 필터에 맞는 랜덤 4개 영화 무비넘 뽑기
    const query = `SELECT MOVIE_NUM FROM movies WHERE ${genresQuery} ORDER BY RAND() LIMIT 4`;
    const [filteredMovies] = await dbPool.execute(query);
    //뽑아온 4개의 영화의 무비넘들
    const selectedMovieNums = filteredMovies.map((movie) => movie.MOVIE_NUM);
    // 추출한 MOVIE_NUM 배열을 JSON 형식으로 변환
    const selectedMovieNumsJSON = JSON.stringify(selectedMovieNums);
    // 이미지 파일명 배열을 JSON 형식으로 변환
    const emojiFileNamesJSON = JSON.stringify(emojiFileNames);
    // recommend 테이블에 데이터 삽입
    const insertQuery = `
    INSERT INTO recommend (USER_NUM, MOVIES_NUM, EMOJI)
    VALUES (?, ?, ?)
  `;
    const values = [formData.userNo, selectedMovieNumsJSON, emojiFileNamesJSON];

    await dbPool.execute(insertQuery, values);

    // 응답 보내기
    res.json({ selectedMovieNumsJSON });
  } catch (error) {
    console.error("무언가 문제가 있다", error);
    res.status(500).send({
      message: "무언가 문제가 있다",
    });
  }
});

module.exports = router;
