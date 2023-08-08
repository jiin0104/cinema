module.exports = {
  userin: {
    query: `SELECT * from user where USER_ID=?`,
  },
  recList: {
    query: `SELECT MOVIE_TITLE, MOVIE_POSTER FROM movies WHERE MOVIE_NUM=?`,
  },
  modList: {
    query: `SELECT M.MOVIE_TITLE, M.MOVIE_POSTER, M.GENRE, M.MOVIE_RELEASE, M.MOVIE_DIRECTOR, M.MOVIE_ACTORS, M.MOVIE_SCORE FROM movies M WHERE M.MOVIE_NUM=?`,
  },
};
