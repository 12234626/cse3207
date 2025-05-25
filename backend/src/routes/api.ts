import {Router} from "express";
import multer from "multer";
import {v4} from "uuid";

import {login, createClub, updateClubRequest, updateClub, getImageUrl, getUser, createImage, updateUser, getPost, createPost} from "../controllers/api";
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
// 로그인
.post("/login", login)
// 동아리 가입 신청 업데이트
.put("/update_club_request", updateClubRequest)
// 이미지 주소 조회
.get("/image_url", getImageUrl)
// 이미지 생성
.post("/image", createImage)
// 동아리 및 상세 설명 게시글 생성
.post("/club", createClub)
// 동아리 및 상세 설명 게시글 수정
.put("/club", updateClub)
// 유저 조회
.get("/user", getUser)
// 유저 업데이트
.put("/user", updateUser)
// 게시글 조회
.get("/post", getPost)
// 게시글 생성
.post("/post", image.single("image"), createPost);

export default api_router;
