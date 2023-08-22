module.exports = {
  //Mypage.vue 로그인한 유저 정보 불러오기
  userin: {
    query: `SELECT * from user where USER_ID=?`,
  },

  //Main.vue 로그인 안했을때, 지금 상영중인 영화 보여주기
  getmain: {
    query: `SELECT *
    FROM movies_now
    ORDER BY RAND();`,
  },

  //Main.vue 로그인 했을때, 추천 목록 유무 확인
  checkRecommendations: {
    query: `SELECT *
    FROM recommend
    JOIN user ON recommend.USER_NUM = user.USER_NUM
    WHERE recommend.USER_NUM = (SELECT USER_NUM FROM user WHERE USER_ID = ?);`,
  },

  //Main.vue 로그인한 유저가 추천받은 리스트가 없다면, 회원가입시 선택한 장르의 영화 불러오기
  getDefaultGenreMovies: {
    query: `select * from movies where GENRE1 = (select GENRE from user where USER_ID = ?) ORDER BY RAND();`,
  },

  //Main.vue 로그인한 유저가 추천받은 리스트가 있다면, 추천받은 리스트중 가장 최근 추천받은 영화와 비슷한 장르의 영화들 불러오기
  getRecentRecommendations: {
    query: `SELECT MOVIE_POSTER
    FROM movies mm
    JOIN (
      SELECT m.genre1
      FROM movies m
      JOIN recommend r ON r.RC_NUM
      JOIN JSON_TABLE(
        r.MOVIE_NUM,
        '$[*]'
        COLUMNS (
          movie_id INT PATH '$'
        )
      ) jt ON m.MOVIE_NUM = jt.movie_id
      JOIN user u ON r.USER_NUM = u.USER_NUM
      WHERE u.USER_ID = ?
      ORDER BY RC_NUM DESC
      LIMIT 1
    ) aa ON mm.genre1 = aa.genre1 ORDER BY RAND();`,
  },

  //Main.vue 로그인 하지 않은 상태에서는 무비스코어에 따라 내림차순으로 20개 뽑아오기.
  popularMovie: {
    query: `select MOVIE_POSTER from movies order by MOVIE_SCORE DESC limit 20;`,
  },

  //Main.vue 많이 추천받은 영화
  countDESC: {
    query: `SELECT *
  FROM (
    SELECT *
    FROM movies
    ORDER BY man DESC
  ) AS sorted_movies
  ORDER BY youth DESC limit 20;`,
  },

  //Recommend.vue 필터링한 결과
  recList: {
    query: `SELECT m.MOVIE_TITLE as TITLE, m.MOVIE_POSTER as POSTER, m.MOVIE_NUM, r.RC_NUM, r.USER_NUM
    FROM movies m
    JOIN recommend r ON r.RC_NUM
    JOIN JSON_TABLE(
      r.MOVIE_NUM,
      '$[*]'
      COLUMNS (
        movie_id INT PATH '$'
      )
    ) jt ON m.MOVIE_NUM = jt.movie_id
    where USER_NUM = (select USER_NUM from user where USER_ID = ?) order by RC_NUM desc limit 4;`,
  },

  //Recommend.vue/Userrecommend.vue 모달창
  modList2: {
    query: ` SELECT
      MOVIE_NUM,
      MOVIE_TITLE,
      MOVIE_POSTER,
      GENRE1,
      GENRE2,
      DATE_FORMAT(MOVIE_RELEASE, '%Y-%m-%d') AS FORMATTED_RELEASE,
      MOVIE_DIRECTOR,
      MOVIE_ACTORS,
      MOVIE_SCORE
    FROM
      movies
    WHERE
      MOVIE_NUM = ?`,
  },

  //Userrecommend.vue 유저가 추천받은 리스트 불러오기
  UserRList: {
    query: `SELECT    
    r.RC_NUM, 
    JSON_ARRAYAGG(m.MOVIE_POSTER) as POSTER,
    r.MOVIE_NUM as MOVIE,
    r.USER_NUM
  FROM
    movies m
  JOIN
    recommend r ON r.RC_NUM
  JOIN
    JSON_TABLE(
      r.MOVIE_NUM,
      '$[*]'
      COLUMNS (
        movie_id INT PATH '$'
      )
    ) jt ON m.MOVIE_NUM = jt.movie_id
  WHERE
  r.USER_NUM = (SELECT USER_NUM FROM user WHERE USER_ID = ?) group by r.RC_NUM;   
`,
  },

  emojipath: {
    query: `SELECT r.*, 
    m1.MOVIE_TITLE AS MOVIE_TITLE1, m1.MOVIE_BACKIMAGE AS BACKIMAGE1, m1.MOVIE_POSTER AS POSTER1,
    m2.MOVIE_TITLE AS MOVIE_TITLE2, m2.MOVIE_BACKIMAGE AS BACKIMAGE2, m2.MOVIE_POSTER AS POSTER2,
    m3.MOVIE_TITLE AS MOVIE_TITLE3, m3.MOVIE_BACKIMAGE AS BACKIMAGE3, m3.MOVIE_POSTER AS POSTER3,
    m4.MOVIE_TITLE AS MOVIE_TITLE4, m4.MOVIE_BACKIMAGE AS BACKIMAGE4, m4.MOVIE_POSTER AS POSTER4
FROM recommend r
LEFT JOIN movies m1 ON r.MOVIE_NUM1 = m1.MOVIE_NUM
LEFT JOIN movies m2 ON r.MOVIE_NUM2 = m2.MOVIE_NUM
LEFT JOIN movies m3 ON r.MOVIE_NUM3 = m3.MOVIE_NUM
LEFT JOIN movies m4 ON r.MOVIE_NUM4 = m4.MOVIE_NUM
where USER_NUM = (select USER_NUM from user where USER_ID = ?)
order by RC_NUM desc limit 1;`,
  },

  //UserRecommend.vue 필터링 이모지 불러오기
  emojipath2: {
    query: `SELECT r.*, 
    m1.MOVIE_TITLE AS MOVIE_TITLE1, m1.MOVIE_BACKIMAGE AS BACKIMAGE1, m1.MOVIE_POSTER AS POSTER1,
    m2.MOVIE_TITLE AS MOVIE_TITLE2, m2.MOVIE_BACKIMAGE AS BACKIMAGE2, m2.MOVIE_POSTER AS POSTER2,
    m3.MOVIE_TITLE AS MOVIE_TITLE3, m3.MOVIE_BACKIMAGE AS BACKIMAGE3, m3.MOVIE_POSTER AS POSTER3,
    m4.MOVIE_TITLE AS MOVIE_TITLE4, m4.MOVIE_BACKIMAGE AS BACKIMAGE4, m4.MOVIE_POSTER AS POSTER4
FROM recommend r
LEFT JOIN movies m1 ON r.MOVIE_NUM1 = m1.MOVIE_NUM
LEFT JOIN movies m2 ON r.MOVIE_NUM2 = m2.MOVIE_NUM
LEFT JOIN movies m3 ON r.MOVIE_NUM3 = m3.MOVIE_NUM
LEFT JOIN movies m4 ON r.MOVIE_NUM4 = m4.MOVIE_NUM
where USER_NUM = (select USER_NUM from user where USER_ID = ?);`,
  },
  //UserRecommend.vue 리뷰
  review: {
    query: `select r.USER_NICKNAME, r.REVIEW_COMMENT, m.MOVIE_NUM
    from movies m, review r where m.MOVIE_NUM = r.MOVIE_NUM and r.MOVIE_NUM = ? ORDER BY RAND() LIMIT 5`,
  },
};
