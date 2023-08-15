const express = require("express");
const cors = require("cors");
const dbPool = require("./db.js"); //db가 필요한 작업에서 끌어다 쓸 변수 정의.
const axios = require("axios");
let sql = require("./sql.js");

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
// const movieRouter = require('./routes/movie');
const mypageRouter = require("./routes/mypage");

app.use("/auth", authRouter);
// app.use('/movie', movieRouter);
app.use("/mypage", mypageRouter);

//이모지 불러오기 -- 라우터 쪼개야됨
app.post("/upload/:type/:fileName", async (request, res) => {
  let { fileName } = request.params;
  const dir = `${__dirname}/upload/`;
  const file = `${dir}/${fileName}`;
  if (!request.body.data)
    return fs.unlink(file, async (err) =>
      res.send({
        err,
      })
    );
  const data = request.body.data.slice(
    request.body.data.indexOf(";base64,") + 8
  );
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFile(file, data, "base64", async (error) => {
    await req.db("accommodations", [
      {
        //type: type,
        path: fileName,
      },
    ]);

    if (error) {
      res.send({
        error,
      });
    } else {
      res.send("ok");
    }
  });
});
//이모지 뷰쪽으로 보내기  -- 라우터 쪼개야됨
app.get("/download/:fileName", (request, res) => {
  const { fileName } = request.params;
  const filepath = `${__dirname}/uploads/${fileName}`;
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  );
  if (!fs.existsSync(filepath))
    res.send(404, {
      error: "Can not found file.",
    });
  else fs.createReadStream(filepath).pipe(res);
});

// 서버 실행
app.listen(3000, () => {
  console.log("port 3000에서 서버구동");
});

module.exports = dbPool;
