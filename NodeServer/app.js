const express = require("express");
const cors = require("cors");
const fs = require("fs");

//익스프레스 객체
const app = express();

//콜스 설정
let corsOption = {
  origin: "http://localhost:8080", // 접근 권한 부여 도메인
  credentials: true, //true로 하면 설정한 내용을 response 헤더에 추가 해줌.
  optionsSuccessStatus: 200, //응답 상태 200으로 설정
};
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors(corsOption)); //CORS 미들웨어

//express 서버로 POST 요청을 할 때 input 태그의 value를 전달하기 위해 사용
//post 방식으로 클라이언트가 요청하는 본문에 있는 value를 넘겨받고 req.body 객체로 만들어주는 미들웨어.
//넘겨받은 value들은 DB로 전송
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//우리가 쿼리 수정했을 때 바로바로 내역 볼 수 있게.
fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
  console.log("sql 변경시 재시작 없이 반영되도록 함.");
  delete require.cache[require.resolve("./sql.js")];
  sql = require("./sql.js");
});

//라우터 목록
// 예시 const mypageRouter = require('./Routers/mypage');
//app.use('/mypage', mypageRouter);
const 엔드포인트로직의메소드명 = require("./Routers/라우터폴더의js파일명");
app.use("/우리가쓸엔드포인트", 엔드포인트로직의메소드명);

// 서버 실행
app.listen(3000, () => {
  console.log("port 3000에서 서버구동");
});
