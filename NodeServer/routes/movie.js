const express = require("express");
const axios = require("axios");
const router = express.Router();
const dbPool = require("../db.js"); //db가 필요한 작업에서 끌어다 쓸 변수 정의.
const bcrypt = require("bcrypt"); // 단방향 암호화
const crypto = require("crypto");

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

module.exports = router;
