const express = require("express");
const cors = require("cors");
const fs = require("fs");
const dbPool = require("./db.js"); //db가 필요한 작업에서 끌어다 쓸 변수 정의.
const axios = require("axios");
const bcrypt = require("bcrypt"); // 단방향 암호화
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
let sql = require("./sql.js");

dotenv.config();

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

const req = {
  async db(alias, param = [], where = "") {
    return new Promise((resolve, reject) =>
      dbPool.query(sql[alias].query + where, param, (error, rows) => {
        if (error) {
          if (error.code != "ER_DUP_ENTRY") console.log(error);
          resolve({
            error,
          });
        } else resolve(rows);
      })
    );
  },
};

//우리가 작성할 엔드포인트 기본틀을 제시. 다른 엔드포인트 작성할 때 /api를 써도 되고 생략해도 됨.
app.post("/apirole/:alias", async (request, res) => {
  if (!request.session.email) {
    return res.status(401).send({
      error: "You need to login.",
    });
  }

  try {
    res.send(await req.db(request.params.alias));
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
});

app.post("/api/:alias", async (request, res) => {
  try {
    res.send(
      await req.db(request.params.alias, request.body.param, request.body.where)
    );
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
});

//이모지 불러오기
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
//이모지 뷰쪽으로 보내기
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

  const query = "SELECT * FROM user WHERE USER_ID = ?";

  dbPool.query(query, [loginUser.userId], function (error, results, fields) {
    if (results.length <= 0) {
      return response.status(200).json({
        message: "undefined_id",
      });
    } else {
      dbPool.query(
        query,
        [loginUser.userId],
        function (error, results, fields) {
          // bcrypt 암호화 된 비밀번호 검증
          const same = bcrypt.compareSync(loginUser.userPw, results[0].USER_PW);
          console.log(results);
          if (same) {
            // ID에 저장된 pw 값과 입력한 pw값이 동일한 경우
            return response.status(200).json({
              message: results[0].USER_ID,
              message1: results[0].USER_NUM,
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

//전화번호를 받아서 아이디 찾기.
app.post("/Find_Id", async (req, res) => {
  try {
    const { phoneNumber } = req.body; //vue에서 받아온 파라미터 값
    const query = "SELECT USER_ID FROM user WHERE USER_TEL = ?"; // 전화번호로 id를 찾는 쿼리
    const connection = await dbPool.promise().getConnection(); // getConnection()을 프로미스를 반환하는 메서드로 사용

    //vue에서 받아온 파라미터 값 확인됐음.
    console.log({ phoneNumber });

    const result = await connection.query(query, [phoneNumber]); // 쿼리 실행
    connection.release(); // 사용이 완료된 연결 반납

    //db에서 쿼리 이용해서 가져온 값 확인됐음.
    console.log(result);

    if (result.length > 0) {
      const id = result[0][0]?.USER_ID;
      res.json({ id }); // 아이디를 응답으로 전송
      console.log({ id }); //id객체에 가져온 db값 넣어지는 거 확인 됐음.
    } else {
      const id = ""; // 응답이 없을 때 빈 id 값을 설정
      res.json({ id }); // 빈 id 값을 응답으로 전송
      console.log({ id }); // 빈 id 값이 들어오는지 확인
    }
  } catch (err) {
    res.status(500).send({ error: "DB 연결에 문제가 있습니다" });
    console.error(err);
  }
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

//전화번호 확인 후 인증번호 보내는 미들웨어.
///checkPhoneNumber 엔드포인트
app.post("/checkPhoneNumber", async (req, res) => {
  const phoneNumber = req.body.phoneNumber; // 전화번호 입력 값
  console.log(phoneNumber); //전화번호 받아오는지 콘솔에서 확인

  try {
    // 전화번호를 이용하여 쿼리 실행
    const query = "SELECT COUNT(*) AS count FROM user WHERE USER_TEL = ?";
    const connection = await dbPool.promise().getConnection();

    const result = await connection.query(query, [phoneNumber]); // 쿼리 실행결과
    const count = result[0][0].count;
    const exists = count > 0;

    console.log(result); //결과가 나오는지 콘솔에서 확인
    console.log(count); //전화번호가 일치하는 게 있는지 없는지 확인
    console.log(exists); // 전화번호가 존재하면 true반환

    if (exists) {
      // 전화번호가 존재하는 경우, 네이버 SMS API를 사용하여 인증번호 전송
      const verificationCode = Math.floor(1000 + Math.random() * 9000); //4자리의 인증번호를 난수로 생성
      const serviceId = "ncp:sms:kr:266040473450:findpw"; // 네이버 SMS 서비스 ID
      const accessKey = "0duT1ylOA5XIOuBWblte"; // 네이버 SMS 액세스 키
      const secretKey = "xrzbmK4KnV29iI4ZJ70iVHEglhYU86cnJZ19Pkm7"; // 네이버 SMS 시크릿 키
      const apiURL = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`; // API 엔드포인트 URL

      const timeStamp = String(Date.now());
      const signature = getSignature(
        serviceId,
        timeStamp,
        accessKey,
        secretKey
      );

      const requestData = {
        type: "SMS",
        contentType: "COMM",
        countryCode: "82",
        from: "01066856466",
        content: `인증번호: ${verificationCode}`,
        messages: [
          {
            to: phoneNumber,
            content: `인증번호: ${verificationCode}`,
          },
        ],
      };

      const headers = {
        accept: "application/json",
        "content-Type": "application/json; charset=UTF-8",
        "x-ncp-apigw-timestamp": timeStamp,
        "x-ncp-iam-access-key": accessKey,
        "x-ncp-apigw-signature-v2": signature,
      };

      try {
        const response = await axios.post(apiURL, requestData, { headers });
        console.log("인증번호가 전송되었습니다.");
        // 응답으로 인증번호를 반환
        res.json({ exists: true, verificationCode });
      } catch (error) {
        console.error("인증번호 전송에 실패했습니다.", error);
        res.status(500).json({ error: "인증번호 전송에 실패했습니다." });
      }
    } else {
      // 전화번호가 존재하지 않는 경우: 응답으로 전송
      res.json({ exists: false });
    }

    // 연결 해제
    connection.release();
  } catch (error) {
    console.error("DB 연결에 문제가 있습니다.", error);
    res.status(500).json({ error: "DB 연결에 문제가 있습니다." });
  }
});

function getSignature(serviceId, timeStamp, accessKey, secretKey) {
  const method = "POST";
  const url = `/sms/v2/services/${serviceId}/messages`;
  const space = " ";
  const newLine = "\n";

  const buffer = [];
  buffer.push(method);
  buffer.push(space);
  buffer.push(url);
  buffer.push(newLine);
  buffer.push(timeStamp);
  buffer.push(newLine);
  buffer.push(accessKey);

  const message = buffer.join("");
  const key = Buffer.from(secretKey, "utf-8");
  const hmac = crypto.createHmac("sha256", key);
  hmac.update(message);

  const signatureKey = hmac.digest("base64");
  return signatureKey;
}

// 비밀번호 찾기 API 엔드포인트
app.post("/Find_PW", async (req, res) => {
  const { phoneNumber } = req.body; // 클라이언트(프론트엔드)에서 전달받은 전화번호

  console.log(this.phoneNumber);

  try {
    // 전화번호를 이용하여 해당 전화번호와 일치하는 계정의 비밀번호를 데이터베이스에서 조회
    const query = "SELECT USER_PW FROM user WHERE USER_TEL = ?";
    const connection = await dbPool.promise().getConnection();
    const result = await connection.query(query, [phoneNumber]);
    connection.release();

    console.log(this.result);

    // 조회 결과를 확인하여 해당 전화번호에 대한 계정이 있을 경우 비밀번호를 클라이언트(프론트엔드)에 응답으로 전송
    if (result.length > 0) {
      const password = result[0][0].USER_PW;
      res.json({ password });
      console.log(this.password);
    } else {
      // 조회 결과가 없을 경우 (일치하는 계정이 없는 경우) 빈 비밀번호를 응답으로 전송
      res.json({ password: "" });
    }
  } catch (error) {
    console.error("비밀번호 조회에 실패했습니다.", error);
    res.status(500).json({ error: "비밀번호 조회에 실패했습니다." });
  }
});

// 정보 수정 API 엔드포인트
app.post("/pw_update", (req, res) => {
  //db연결을 사용해서 작업
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("db연결에 문제가 있음", err);
      return res.status(500).json({ error: "db연결에 실패했습니다." });
    }

    const { password, stpw } = req.body;

    const encryptedPW2 = bcrypt.hashSync(password, 10);
    console.log(stpw);

    const updateUserSql = "UPDATE user SET USER_PW=? where USER_PW=?";
    const values = [encryptedPW2, stpw];
    connection.query(updateUserSql, values, (err, result) => {
      connection.release(); // 사용이 완료된 연결 반환

      if (err) {
        console.error("비밀번호 업데이트 실패:", err);
        return res.status(500).json({ error: "비밀번호 수정에 실패했습니다." });
      }

      // 정보 수정 성공 응답
      res.json({ message: "비밀번호 수정 되었습니다." });
    });
  });
});

//TMDB api 이용해서 db에 영화 json데이터 넣기
app.post("/fetch-movies", async (req, res) => {
  try {
    // FilteringR.vue에서 전달한 데이터 받기
    const selectedGenres = req.body.selectedGenres;
    //받아온 데이터를 api에 적용해서 영화 json데이터 url 만들기
    const apiKey = "49ba50092811928efb84febb9d68823f";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&with_genres=${selectedGenres.join(
      ","
    )}&api_key=${apiKey}`;

    const options = {
      method: "GET",
      url: apiUrl,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    //url에서 받아온 json데이터
    const response = await axios.request(options);

    const movies = response.data.results;
    // 가져온 영화 정보를 db에 저장
    for (const movie of movies) {
      const movieId = movie.id; // 영화의 고유 id
      const movieInfo = JSON.stringify(movie); // JSON 데이터를 문자열로 변환

      // movies_db 테이블에 해당 movieId가 이미 존재하는지 확인하는 쿼리문
      const duplicateCheckQuery =
        "SELECT COUNT(*) as count FROM movies_db WHERE movieid = ?";
      const [duplicateCheckRows] = await dbPool
        .promise()
        .query(duplicateCheckQuery, [movieId]);
      const isDuplicate = duplicateCheckRows[0].count > 0;

      if (!isDuplicate) {
        // movies_db 테이블에 영화 정보 추가
        const insertQuery =
          "INSERT INTO movies_db (movieid, movieinfo) VALUES (?, ?)";
        await dbPool.promise().query(insertQuery, [movieId, movieInfo]);
      }
    }

    // console.log를 사용하여 데이터 확인
    // console.log("Selected genres:", selectedGenres);
    // console.log(apiUrl);

    res.json({ message: "Movies fetched and processed." });
  } catch (error) {
    console.error("Error fetching and processing movies:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching and processing movies.",
    });
  }
});

//db에 저장된 포스터패스를 TMDB api이용해서 url받고 프론트로 쏴줌
app.post("/recommend-movies", async (req, res) => {
  try {
    // FilteringR.vue에서 전달한 데이터 받기
    const selectedGenres = req.body.selectedGenres;

    // db에서 해당 장르에 맞는 영화를 랜덤하게 4개 선택
    const query = `
      SELECT movieid
      FROM movies_db
      WHERE JSON_CONTAINS(movieinfo->'$.genre_ids', ?)
      ORDER BY RAND()
      LIMIT 4;
    `;

    const [rows, fields] = await dbPool
      .promise()
      .query(query, [JSON.stringify(selectedGenres)]);

    // 선택된 영화들의 id값 배열
    const selectedMovieIds = rows.map((row) => row.movieid);

    // 각 영화의 포스터 URL 가져오기
    const apiKey = "49ba50092811928efb84febb9d68823f";
    const baseImageUrl = "https://image.tmdb.org/t/p/";
    const posterSize = "w500"; // 원하는 이미지 크기

    const movieDetailsPromises = selectedMovieIds.map(async (movieId) => {
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

      try {
        const response = await axios.get(apiUrl);
        const movieData = response.data;

        // 영화 포스터 이미지 URL 생성
        const posterPath = movieData.poster_path;
        const posterUrl = `${baseImageUrl}${posterSize}${posterPath}`;

        return {
          movieid: movieId,
          posterUrl: posterUrl,
        };
      } catch (error) {
        console.error("Error fetching movie details from TMDB:", error);
        return null;
      }
    });

    //추천된 영화의 상세 정보 배열
    const moviePosters = await Promise.all(movieDetailsPromises);
    // console.log를 사용하여 데이터 확인
    // console.log("Selected genres:", selectedGenres);
    // console.log(apiUrl);
    // console.log(query);
    // console.log("Movie Posters:", moviePosters);

    // recommend 테이블에 영화 4개 정보 넣기
    // moviePosters 배열을 JSON 형태로 변환
    const rcMoviesData = JSON.stringify(moviePosters);
    // 추천된 영화의 영화 ID 값들을 추출하여 배열 생성
    const movieIds = moviePosters.map((poster) => poster.movieid);
    // movieIds 배열을 JSON 형태로 변환
    const movieIdsData = JSON.stringify(movieIds);

    // recommend 테이블에 데이터 삽입
    const insertQuery = `INSERT INTO recommend (RC_MOVIES, movieid) VALUES (?, ?)`;
    await dbPool.promise().query(insertQuery, [rcMoviesData, movieIdsData]);

    // console.log를 사용하여 데이터 확인
    console.log("rcMoviesData제이슨 변환 확인", rcMoviesData);
    console.log("movieIdsData제이슨 변환 확인", movieIdsData);

    res.status(200).json(movieDetails);
  } catch (error) {
    console.error("리커맨드-무비엔드포인트에러", error);
    res
      .status(500)
      .json({ error: "An error occurred while recommending movies" });
  }
});

// 다른 라우트 및 설정 등 추가

// 정보 수정 API 엔드포인트
app.post("/mypage_update", (req, res) => {
  //db연결을 사용해서 작업
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("db연결에 문제가 있음", err);
      return res.status(500).json({ error: "db연결에 실패했습니다." });
    }

    const {
      nickname,
      password,
      age,
      phone,
      address1,
      address2,
      sex,
      genre,
      userid,
    } = req.body;

    const encryptedPW = bcrypt.hashSync(password, 10); // 비밀번호 암호화

    // 중복된 이메일이 없을 경우 회원 정보 저장
    const insertUserSql =
      "UPDATE user SET USER_PW=?, USER_NICKNAME=?, USER_AGE=?, USER_TEL=?, USER_ADDRESS1=?, USER_ADDRESS2=?, SEX=?, GENRE=? where USER_ID=?";
    const values = [
      encryptedPW,
      nickname,
      age,
      phone,
      address1,
      address2,
      sex,
      genre,
      userid,
    ];
    connection.query(insertUserSql, values, (err, result) => {
      connection.release(); // 사용이 완료된 연결 반환

      if (err) {
        console.error("회원 정보 수정 실패:", err);
        return res
          .status(500)
          .json({ error: "회원 정보 수정에 실패했습니다." });
      }

      // 수정 성공 응답
      res.json({ message: "수정 완료" });
    });
  });
});

//
app.post("/rcinsert", (req, res) => {
  //db연결을 사용해서 작업
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error("db연결에 문제가 있음", err);
      return res.status(500).json({ error: "db연결에 실패했습니다." });
    }

    const { userNo, ne1, e1, ne2, e2, ne3, e3, ne4, e4 } = req.body;

    // 중복된 이메일이 없을 경우 회원 정보 저장
    const insertUserSql =
      "INSERT INTO recommend set USER_NUM=?, EMOJI=JSON_OBJECT(?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [userNo, ne1, e1, ne2, e2, ne3, e3, ne4, e4];
    connection.query(insertUserSql, values, (err, result) => {
      connection.release(); // 사용이 완료된 연결 반환

      if (err) {
        console.error("인서트 실패:", err);
        return res.status(500).json({ error: "인서트에 실패했습니다." });
      }

      // 회원 가입 성공 응답
      res.json({ message: "결과 페이지로 이동합니다" });
    });
  });
});

// 서버 실행
app.listen(3000, () => {
  console.log("port 3000에서 서버구동");
});

module.exports = dbPool;
