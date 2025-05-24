import {Router} from "express";

import user_router from "./user";
import club_router from "./club";
import post_router from "./post";
import club_member_router from "./club_member";
import club_request_router from "./club_request";
import club_info_post_router from "./club_info_post";
import image_router from "./image";

// 데이터베이스 라우터
const db_router = Router();

db_router
// /user 경로에 유저 데이터베이스 라우터 연결
.use("/user", user_router)
// /club 경로에 동아리 데이터베이스 라우터 연결
.use("/club", club_router)
// /post 경로에 게시글 데이터베이스 라우터 연결
.use("/post", post_router)
// /club_member 경로에 동아리 회원 데이터베이스 라우터 연결
.use("/club_member", club_member_router)
// /club_request 경로에 동아리 가입 신청 데이터베이스 라우터 연결
.use("/club_request", club_request_router)
// /club_info_post 경로에 동아리 상세 설명 게시글 데이터베이스 라우터 연결
.use("/club_info_post", club_info_post_router)
// /image 경로에 이미지 데이터베이스 라우터 연결
.use("/image", image_router);

export default db_router;
