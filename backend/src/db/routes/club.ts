import {Router} from "express";

import {getAllClubs, getClubById, createClub, updateClub, deleteClub} from "../controllers/club";

// 동아리 데이터베이스 라우터
const club_router = Router();

club_router
// 모든 동아리 조회
.get("/", getAllClubs)
// 아이디로 동아리 조회
.get("/club/:id", getClubById)
// 동아리 생성
.post("/", createClub)
// 동아리 업데이트
.put("/:id", updateClub)
// 동아리 삭제
.delete("/:id", deleteClub);

export default club_router;
