import {Router} from "express";
import {createUser, getAllUsers, getUserById, updateUser, deleteUser} from "../controllers/user";

// 유저 데이터베이스 라우터
const user_router = Router();

user_router
// 모든 유저 조회
.get("/", getAllUsers)
// 아이디로 유저 조회
.get("/:id", getUserById)
// 유저 생성
.post("/", createUser)
// 유저 업데이트
.put("/:id", updateUser)
// 유저 삭제
.delete("/:id", deleteUser);

export default user_router;
