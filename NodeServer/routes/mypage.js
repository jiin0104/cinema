const express = require("express");
const router = express.Router();
const dbPool = require("../db.js"); //db가 필요한 작업에서 끌어다 쓸 변수 정의.
const bcrypt = require("bcrypt"); // 단방향 암호화

// 마이페이지 정보 수정 API 엔드포인트
router.post("/mypage_update", (req, res) => {
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
  router.post("/rcinsert", (req, res) => {
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

  module.exports = router;