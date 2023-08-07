module.exports = {
  userinfo: {
    query: `SELECT USER_ID, USER_NICKNAME, USER_TEL, USER_ADDRESS1, USER_ADDRESS2, USER_AGE, SEX, GENRE from user where USER_ID=?`,
  },
  recList: {
    query: `SELECT MOVIE_TITLE, MOVIE_POSTER FROM movies WHERE MOVIE_NUM=1`,
  },
};
