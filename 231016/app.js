const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

let fileName = 1;

app.use("/addjson", async (req, res) => {
  const { jsonData } = req.body;
  console.log("@@@@@@@@@@@", jsonData);
  fs.writeFile(
    path.join(__dirname, `/test/src/NFTjson/NFT_JSON${fileName}.json`),
    JSON.stringify(jsonData, null, 2),
    (err) => {
      if (err) {
        console.log("json파일 생성 오류", err);
      } else {
        console.log("json파일 생성완료");
      }
    }
  );
  fileName += 1;
  res.json("success");
});

app.listen("8080", () => {
  console.log("server on");
});
