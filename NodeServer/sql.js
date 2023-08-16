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
    query: `SELECT json_extract(emoji, '$.emoji1','$.emoji2', '$.emoji3','$.emoji4') FROM recommend where USER_NUM = (select USER_NUM from user where USER_ID = ?)`,
  },
  emojipath2: {
    query: `SELECT * FROM recommend where USER_NUM = (select USER_NUM from user where USER_ID = ?)`,
  },
  recList: {
    query: `SELECT MOVIE_TITLE, MOVIE_POSTER, MOVIE_NUM
    FROM movies
    WHERE MOVIE_NUM IN (
      SELECT
        JSON_UNQUOTE(JSON_EXTRACT(MOVIE_NUM, '$[0]')) AS movie_id
      FROM recommend
      WHERE RC_NUM = 47
    );`, //임으로 RC_NUM지정해서 불러오는지 확인해봄.
  },
};
