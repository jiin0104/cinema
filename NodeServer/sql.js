module.exports = {
  userin: {
    query: `SELECT * from user where USER_ID=?`,
  },
  recList: {
    query: `SELECT MOVIE_TITLE, MOVIE_POSTER, MOVIE_NUM FROM movies`,
  },
  modList: {
    query: `SELECT * FROM movies WHERE MOVIE_NUM=2`,
  },
  modList2: {
    query: ` SELECT
    MOVIE_NUM,
    MOVIE_TITLE,
    MOVIE_POSTER,
    GENRE,
    MOVIE_RELEASE,
    MOVIE_DIRECTOR,
    MOVIE_ACTORS,
    MOVIE_SCORE
  FROM
    movies
  WHERE
    MOVIE_NUM = ?`,
  },
  getmain: {
    query: `select MOVIE_POSTER from movies_now`,
  },
};
