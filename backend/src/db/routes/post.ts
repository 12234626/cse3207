import {Router} from "express";

import {getAllPosts, getPostById, createPost, updatePost, deletePost} from "../controllers/post";

// 게시글 데이터베이스 라우터
const post_router = Router();

post_router
// 모든 게시글 조회
.get("/", getAllPosts)
// 아이디로 게시글 조회
.get("/:id", getPostById)
// 게시글 생성
.post("/", createPost)
// 게시글 수정
.put("/:id", updatePost)
// 게시글 삭제
.delete("/:id", deletePost);

export default post_router;
