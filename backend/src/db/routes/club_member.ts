import {Router} from "express";

import {getAllClubMembers, getAllUserClubs, createClubMember, deleteClubMember} from "../controllers/club_member";

// 동아리 데이터베이스 라우터
const club_member_router = Router();

club_member_router
// 동아리에 가입한 모든 유저 조회
.get("/club/:club_id", getAllClubMembers)
// 유저가 가입한 모든 동아리 조회
.get("/user/:user_id", getAllUserClubs)
// 동아리 가입
.post("/", createClubMember)
// 동아리 탈퇴
.delete("/", deleteClubMember);

export default club_member_router;
