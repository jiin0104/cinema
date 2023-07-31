// 영화 목록 조회 쿼리
const getAllMovies = (connection, callback) => {
  const query = "SELECT * FROM movies";
  connection.query(query, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getAllMovies,
};
