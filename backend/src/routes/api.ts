import {Router} from "express";

import {login, createClub, updateClubRequest, updateClubWithInfoPost} from "../controllers/api";

const api_router = Router();

api_router
// 로그인
.post("/login", login)
// 동아리 생성
.post("/create_club", createClub)
// 동아리 가입 신청 업데이트
.put("/update_club_request", updateClubRequest)
// 동아리 + 상세 설명 게시글 동시 수정
.put("/club_with_info_post", updateClubWithInfoPost);

export default api_router;
