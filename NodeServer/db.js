const mysql = require("mysql2");

//연결하는 db
const dbPool = mysql.createPool({
  host: "43.201.30.169",
  user: "wavecinema",
  password: "zipwave02",
  database: "project",
  connectionLimit: 100, //연결할 수 있는 최대 수 100
});

//createconnection 말고 createpool을 이용해서 연결.
//createConnection은 단일 연결 방식, 요청이 있을 때마다 연결 객체를 생성했다가, 제거하는 것이 반복.
//따라서 비용, 시간, 연결에 대한 부담이 발생
//createpool을 이용한 커넥션 생성
dbPool.getConnection((err, connection) => {
  if (err) {
    console.error("db 연동에 문제가 있습니다:", err);
    return;
  }
  console.log("db와 연결 성공");

  //연결을 사용한 작업 수행

  connection.release(); //사용 완료된 연결 반납
});

module.exports = dbPool;
