import {Router} from "express";

import {getClubMember, createClubMember, deleteClubMember} from "../controllers/club_member";

// 동아리 데이터베이스 라우터
const club_member_router = Router();

club_member_router
// 동아리 회원 조회
.get("/club/:club_id", getClubMember)
// 동아리 회원 생성
.post("/", createClubMember)
// 동아리 회원 삭제
.delete("/", deleteClubMember);

export default club_member_router;
