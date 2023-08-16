const express = require("express");
const router = express.Router();

//FilterR.vue에서 받은 장르값을 movies 테이블에 적용 시켜서 뽑아오고,뽑아온 영화 4개를 recommend테이블에 넣어주고, Recommend.vue로 보내주기
router.post("/filtervalues", async (request, res) => {
  try {
    const formData = request.body; // 클라이언트에서 보낸 데이터 받아오기
    console.log(formData);
    // TODO: formData를 이용해서 원하는 로직 수행 (예: 데이터베이스 쿼리 실행 등)

    // 응답 보내기
    res.status(200).send({
      message: "데이터 처리 성공",
    });
  } catch (error) {
    console.error("데이터 처리 실패", error);
    res.status(500).send({
      message: "데이터 처리 실패",
    });
  }
});

//이모지 불러오기
router.post("/upload/:type/:fileName", async (request, res) => {
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
router.get("/download/:fileName", (request, res) => {
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
