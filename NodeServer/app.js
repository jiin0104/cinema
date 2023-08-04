const express = require("express");
const cors = require("cors");
const fs = require("fs");
const dbPool = require("./db.js"); //db가 필요한 작업에서 끌어다 쓸 변수 정의.
const axios = require("axios");
const bcrypt = require("bcrypt"); // 단방향 암호화
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
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

//우리가 쿼리 수정했을 때 바로바로 내역 볼 수 있게.
fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
  console.log("sql 변경시 재시작 없이 반영되도록 함.");
  delete require.cache[require.resolve("./sql.js")];
  sql = require("./sql.js");
});

//라우터 목록
// 예시 const mypageRouter = require('./Routers/mypage');
//app.use('/mypage', mypageRouter);
// const 엔드포인트로직의메소드명 = require("./Routers/라우터폴더의js파일명");
// app.use("/우리가쓸엔드포인트", 엔드포인트로직의메소드명);

//우리가 작성할 엔드포인트 기본틀을 제시. 다른 엔드포인트 작성할 때 /api를 써도 되고 생략해도 됨.
app.post("/api/:alias", async (request, res) => {
  try {
    res.send(
      await req.dbPool(
        request.params.alias,
        request.body.param,
        request.body.where
      )
    );
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
});

// 회원 가입 API 엔드포인트
app.post("/signup", (req, res) => {
  //db연결을 사용해서 작업
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("db연결에 문제가 있음", err);
      return res.status(500).json({ error: "db연결에 실패했습니다." });
    }

    const {
      email,
      nickname,
      password,
      age,
      phone,
      address1,
      address2,
      sex,
      genre,
    } = req.body;

    const encryptedPW = bcrypt.hashSync(password, 10); // 비밀번호 암호화

    // 중복된 이메일이 없을 경우 회원 정보 저장
    const insertUserSql =
      "INSERT INTO user (USER_ID, USER_PW, USER_NICKNAME, USER_AGE, USER_TEL, USER_ADDRESS1, USER_ADDRESS2, SEX, GENRE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      email,
      encryptedPW,
      nickname,
      age,
      phone,
      address1,
      address2,
      sex,
      genre,
    ];
    connection.query(insertUserSql, values, (err, result) => {
      connection.release(); // 사용이 완료된 연결 반환

      if (err) {
        console.error("회원 정보 인서트 실패:", err);
        return res
          .status(500)
          .json({ error: "회원 정보 인서트에 실패했습니다." });
      }

      // 회원 가입 성공 응답
      res.json({ message: "가입 되셨습니다." });
    });
  });
});

//로그인 라우터. 웹페이지'/login'에서 인증로직 처리.
app.post("/login", function (request, response) {
  const loginUser = request.body;
  console.log(loginUser.userId);
  console.log(loginUser.userPw);

  const query = "SELECT * FROM user WHERE USER_ID = ?";

  dbPool.query(query, [loginUser.userId], function (error, results, fields) {
    console.log(results.length);
    if (results.length <= 0) {
      return response.status(200).json({
        message: "undefined_id",
      });
    } else {
      dbPool.query(
        query,
        [loginUser.userId],
        function (error, results, fields) {
          const same = bcrypt.compareSync(loginUser.userPw, results[0].USER_PW);
          console.log(results);
          if (same) {
            // ID에 저장된 pw 값과 입력한 pw값이 동일한 경우
            return response.status(200).json({
              message: results[0].USER_NO,
            });
          } else {
            // 비밀번호 불일치
            return response.status(200).json({
              message: "incorrect_pw",
            });
          }
        }
      );
    }
  });
});

app.post("/logout", async (request, res) => {
  // client에서 server쪽으로 axios post()방식으로 logout api가져오기
  request.session.destroy(); // session 없애기
  res.send("ok");
});

// 이메일 중복 확인
app.post("/checkEmail", (req, res) => {
  //db 연결을 사용해서 작업
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("db 연결에 문제가 있습니다:", err);
      return res.status(500).json({ error: "DB 연결에 실패했습니다." });
    }

    const { email } = req.body;

    const checkDuplicateEmailSql = "SELECT * FROM user WHERE USER_ID = ?";
    connection.query(checkDuplicateEmailSql, [email], (error, results) => {
      connection.release(); // 사용이 완료된 연결 반납

      if (error) {
        console.error("이메일 중복검사 에러:", error);
        return res.status(500).json({ error: "이메일 중복검사 실패." });
      }

      if (results.length > 0) {
        res.json({ exists: true });
      } else {
        // 이미 존재하는 이메일인 경우 false
        res.json({ exists: false });
      }
    });
  });
});

//닉네임 중복 확인
app.post("/checkNickname", (req, res) => {
  const { nickname } = req.body;

  const checkDuplicateNicknameSql =
    "SELECT * FROM user WHERE USER_NICKNAME = ?";
  dbPool.query(checkDuplicateNicknameSql, [nickname], (error, results) => {
    if (error) {
      console.error("닉네임 중복 확인 에러:", error);
      return res
        .status(500)
        .json({ error: "닉네임 중복 확인에 실패했습니다." });
    }

    if (results.length > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  });
});

// 서버 실행
app.listen(3000, () => {
  console.log("port 3000에서 서버구동");
});
