import express from "express";
import cors from "cors";

import db_router from "./db/routes/index";
import syncDB from "./db/init/init";

const app = express();
const HOST: string = process.env.HOST || "localhost";
const PORT: number = Number(process.env.PORT) || 3000;

app
// CORS 설정
.use(cors())
// JSON 파싱 설정
.use(express.json())
// /public 경로에 있는 정적 파일 제공
.use(express.static("../public"))
// 라우터 설정
.use("./db", db_router);

// 데이터베이스 동기화 및 서버 시작
syncDB()
.then(function () {
  app.listen(PORT, HOST, function () {
    console.log(`http://${HOST}:${PORT}`);
  });
});
