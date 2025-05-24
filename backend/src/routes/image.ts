import {Router} from "express";

import {getImage, createImage, updateImage, deleteImage} from "../controllers/image";

// 이미지 라우터
const image_router = Router();

image_router
// 이미지 조회
.get("/", getImage)
// 이미지 생성
.post("/", createImage)
// 이미지 업데이트
.put("/", updateImage)
// 이미지 삭제
.delete("/", deleteImage);

export default image_router;
