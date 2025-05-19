import {Router} from "express";
import {deleteClubRequest, getAllClubRequests, createClubRequest, getAllUserRequests, updateClubRequestStatus} from "../controllers/club_reqeust";


// 동아리 데이터베이스 라우터
const club_request_router = Router();

club_request_router
// 동아리에 가입 신청한 모든 유저 조회
.get("/club/:club_id", getAllClubRequests)
// 유저가 가입 신청한 모든 동아리 조회
.get("/user/:user_id", getAllUserRequests)
// 동아리 가입 신청 생성
.post("/user/:user_id/club/:club_id", createClubRequest)
// 동아리 가입 신청 상태 업데이트
.put("/:id", updateClubRequestStatus)
// 동아리 가입 신청 삭제
.delete("/:id", deleteClubRequest);

export default club_request_router;
