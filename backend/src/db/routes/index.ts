import {Router} from "express";

import user_router from "./user";
import club_router from "./club";
import club_member_router from "./club_member";
import post_router from "./post";
import club_request_router from "./club_request";

// 데이터베이스 라우터
const db_router = Router();

db_router
// /user 경로에 유저 데이터베이스 라우터 연결
.use("/user", user_router)
// /club 경로에 동아리 데이터베이스 라우터 연결
.use("/club", club_router)
// /club_member 경로에 동아리 회원 데이터베이스 라우터 연결
.use("/club_member", club_member_router)
// /club_request 경로에 동아리 가입 신청 데이터베이스 라우터 연결
.use("/club_request", club_request_router)
// /post 경로에 게시글 데이터베이스 라우터 연결
.use("/post", post_router)

export default db_router;
