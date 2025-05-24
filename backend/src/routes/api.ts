import {Router} from "express";

import {login, createClub} from "../controllers/api";

const api_router = Router();

api_router
// 로그인
.post("/login", login)
// 동아리 생성
.post("/create_club", createClub)

export default api_router;
