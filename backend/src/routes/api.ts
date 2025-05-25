import {Router} from "express";
import multer from "multer";
import {v4} from "uuid";

import {login, createClub, updateClubRequest, updateClubWithInfoPost, uploadImage} from "../controllers/api";

const api_router = Router();
const image = multer({
  storage: multer.diskStorage({
    filename(req, file, cb) {
      cb(null, `${v4()}.jpeg`);
    },
    destination(req, file, cb) {
      cb(null, "data/images");
    }
  }),
  // limits: {fileSize: 1024 * 1024}
});

api_router
// 로그인
.post("/login", login)
// 동아리 생성
.post("/create_club", createClub)
// 동아리 가입 신청 업데이트
.put("/update_club_request", updateClubRequest)
// 동아리 정보 및 상세 설명 게시글 수정
.put("/club_with_info_post", updateClubWithInfoPost)
// 이미지 업로드
.post("/image_upload", image.single("image"), uploadImage)

export default api_router;
