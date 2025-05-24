import {Router} from "express";

import {getClubInfoPost, createClubInfoPost, updateClubInfoPost, deleteClubInfoPost} from "../controllers/club_info_post";

// 동아리 데이터베이스 라우터
const club_info_post_router = Router();

club_info_post_router
// 동아리 상세 설명 게시글 조회
.get("/", getClubInfoPost)
// 동아리 상세 설명 게시글 생성
.post("/", createClubInfoPost)
// 동아리 상세 설명 게시글 업데이트
.put("/", updateClubInfoPost)
// 동아리 상세 설명 게시글 삭제
.delete("/", deleteClubInfoPost);

export default club_info_post_router;
