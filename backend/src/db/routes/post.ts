import {Router} from "express";

import {getPost, createPost, updatePost, deletePost, updatePostClubId} from "../controllers/post";

// 게시글 데이터베이스 라우터
const post_router = Router();

post_router
// 게시글 조회
.get("/", getPost)
// 게시글 생성
.post("/", createPost)
// 게시글 수정
.put("/", updatePost)
// 게시글 삭제
.delete("/", deletePost)
// 게시글 club_id만 업데이트
.put("/club-id", updatePostClubId);
export default post_router;
