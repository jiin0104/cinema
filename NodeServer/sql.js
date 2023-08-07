module.exports = {
  userin: {
    query: `SELECT * from user where USER_ID=?`,
  },
  recList: {
    query: `SELECT MOVIE_TITLE, MOVIE_POSTER FROM movies WHERE MOVIE_NUM=1`,
  },
};
