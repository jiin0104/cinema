module.exports = {
  userin: {
    query: `SELECT * from user where USER_ID=?`,
  },
  recList: {
    query: `SELECT MOVIE_TITLE, MOVIE_POSTER FROM movies WHERE MOVIE_NUM=2`,
  },
  modList: {
    query: `SELECT * FROM movies WHERE MOVIE_NUM=2`,
  },
  modList2: {
    query: `SELECT MOVIE_TITLE, MOVIE_RELEASE, MOVIE_DIRECTOR, MOVIE_SCORE, GENRE, json_extract(MOVIE_ACTORS, '$.actor1') FROM movies where MOVIE_NUM=2`,
  }
};
