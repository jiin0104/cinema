module.exports = {
  userin: {
    query: `SELECT * from user where USER_ID=?`,
  },
  recList: {
    query: `SELECT MOVIE_TITLE, MOVIE_POSTER, MOVIE_NUM FROM movies`,
  },
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


  emojipath: {
    query: `SELECT json_extract(emoji, '$.emoji1','$.emoji2', '$.emoji3','$.emoji4') FROM recommend`,
  },
};
