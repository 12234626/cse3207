import {Router} from "express";
import {getAllClubRequests, createClubRequest, updateClubRequestStatus, deleteClubRequest} from "../controllers/club_reqeust";


// 동아리 데이터베이스 라우터
const club_request_router = Router();

club_request_router
// 동아리 가입 신청 조회
.get("/", getAllClubRequests)
// 동아리 가입 신청 생성
.post("/", createClubRequest)
// 동아리 가입 신청 상태 업데이트
.put("/", updateClubRequestStatus)
// 동아리 가입 신청 삭제
.delete("/:id", deleteClubRequest);

export default club_request_router;
