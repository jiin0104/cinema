const express = require("express");
const cors = require("cors");
const dbPool = require("./db.js"); //db가 필요한 작업에서 끌어다 쓸 변수 정의.

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRouter = require("./routes/auth.js");
const movieRouter = require("./routes/movie");
const mypageRouter = require("./routes/mypage");

app.use("/auth", authRouter);
app.use("/movie", movieRouter);
app.use("/mypage", mypageRouter);

// 서버 실행
app.listen(3000, () => {
  console.log("port 3000에서 서버구동");
});

module.exports = dbPool;
