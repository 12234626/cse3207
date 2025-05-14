import {Router} from "express";

import user_router from "./user";

// 데이터베이스 라우터
const db_router = Router();

db_router
// /user 경로에 유저 데이터베이스 라우터 연결
.use("./user", user_router);

export default db_router;
