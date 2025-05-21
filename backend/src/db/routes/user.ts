import {Router} from "express";
import {getUser, createUser, checkUserPassword, updateUser, deleteUser} from "../controllers/user";

// 유저 데이터베이스 라우터
const user_router = Router();

user_router
// 유저 조회
.get("/", getUser)
// 유저 생성
.post("/", createUser)
// 유저 아이디와 비밀번호가 일치하는지 확인
.post("/login", checkUserPassword)
// 유저 업데이트
.put("/", updateUser)
// 유저 삭제
.delete("/", deleteUser);

export default user_router;
