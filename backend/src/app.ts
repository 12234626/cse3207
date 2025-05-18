import express from "express";
import cors from "cors";

import syncDB from "./db/init/init";
import db_router from "./db/routes/index";
import login_router from "./routes/login";
import register_router from "./routes/register";
import main_router from "./routes/main";
import my_router from "./routes/my";
import club_router from "./routes/club";

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
// 요청 및 응답 로그
.use((req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const local_time = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    const duration = Date.now() - startTime;

    console.log(`[${local_time}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
})
// 라우터 설정
.use("/db", db_router)
.use("/login", login_router)
.use("/register", register_router)
.use("/main", main_router)
.use("/my", my_router)
.use("/club", club_router);

// 데이터베이스 동기화 및 서버 시작
syncDB()
.then(function () {
  app.listen(PORT, HOST, function () {
    console.log(`http://${HOST}:${PORT}`);
  });
});
