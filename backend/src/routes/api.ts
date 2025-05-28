import {Router} from "express";
import multer from "multer";
import {v4} from "uuid";

import {getImageUrl, createImage, createClub, updateClub, getUser, login, updateUser, getPost, createPost, createClubRequest, updateClubRequest} from "../controllers/api";
const api_router = Router();
const image = multer({
  storage: multer.diskStorage({
    filename(req, file, cb) {
      cb(null, `${v4()}.jpg`);
    },
    destination(req, file, cb) {
      cb(null, "public/images");
    }
  }),
});

api_router
// 이미지 주소 조회
.get("/image", getImageUrl)
// 이미지 생성
.post("/image", createImage)
// 동아리 및 상세 설명 게시글 생성
.post("/club", image.single("image"), createClub)
// 동아리 및 상세 설명 게시글 수정
.put("/club", image.single("image"), updateClub)
// 유저 조회
.get("/user", getUser)
// 로그인
.post("/login", login)
// 유저 업데이트
.put("/user", image.single("image"), updateUser)
// 게시글 조회
.get("/post", getPost)
// 게시글 생성
.post("/post", image.single("image"), createPost)
// 동아리 가입 신청 생성
.post("/club_request", createClubRequest)
// 동아리 가입 신청 업데이트
.put("/club_request", updateClubRequest);

export default api_router;
