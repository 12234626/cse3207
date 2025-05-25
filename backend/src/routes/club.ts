import {Router} from "express";

import {getClub, createClub, updateClub, deleteClub} from "../controllers/club";

// 동아리 데이터베이스 라우터
const club_router = Router();

club_router
// 동아리 조회
.get("/", getClub)
// 동아리 생성
.post("/", createClub)
// 동아리 업데이트
.put("/", updateClub)
// 동아리 삭제
.delete("/", deleteClub);

export default club_router;
