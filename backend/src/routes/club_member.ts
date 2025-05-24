import {Router} from "express";

import {getClubMember, getClubByUserId, getPostsByClubId, createClubMember, deleteClubMember} from "../controllers/club_member";

// 동아리 데이터베이스 라우터
const club_member_router = Router();

club_member_router
// 동아리 회원 조회
.get("/", getClubMember)
// 유저 아이디로 동아리 조회
.get("/user_id/:user_id", getClubByUserId)
// 동아리별 게시글 조회
.get("/post/club/:club_id", getPostsByClubId)
// 동아리 회원 생성
.post("/", createClubMember)
// 동아리 회원 삭제
.delete("/", deleteClubMember);

export default club_member_router;
