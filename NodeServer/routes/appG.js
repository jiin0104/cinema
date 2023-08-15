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

  //우리가 쿼리 수정했을 때 바로바로 내역 볼 수 있게.
fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
    console.log("sql 변경시 재시작 없이 반영되도록 함.");
    delete require.cache[require.resolve("./sql.js")];
    sql = require("./sql.js");
  });


// req 객체 생성, DB 연동
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