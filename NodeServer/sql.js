module.exports = {
  userin: {
    query: `SELECT * from user where USER_ID=?`,
  },
  // recList: {
  //   query: `SELECT MOVIE_TITLE, MOVIE_POSTER, MOVIE_NUM FROM movies`,
  // },
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
  getmain: {
    query: `select * from movies_now`,
  },
  getmain2: {
    query: `select * from movies where GENRE1 = (select GENRE from user where USER_ID = ?) or GENRE2 = (select GENRE from user where USER_ID = ?) or GENRE3 = (select GENRE from user where USER_ID = ?) or GENRE4 = (select GENRE from user where USER_ID = ?)`,
  },
  getmain3: {
    query: `select * from movies`,
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
  recList: {
    query: `SELECT m.MOVIE_TITLE, m.MOVIE_POSTER, m.MOVIE_NUM, r.RC_NUM, r.USER_NUM
    FROM movies m
    JOIN recommend r ON r.RC_NUM
    JOIN JSON_TABLE(
      r.MOVIE_NUM,
      '$[*]'
      COLUMNS (
        movie_id INT PATH '$'
      )
    ) jt ON m.MOVIE_NUM = jt.movie_id
    where USER_NUM = (select USER_NUM from user where USER_ID = ?) and 
    RC_NUM = (select RC_NUM from recommend order by RC_NUM desc limit 1);`, //임으로 RC_NUM지정해서 불러오는지 확인해봄.
  },
};
