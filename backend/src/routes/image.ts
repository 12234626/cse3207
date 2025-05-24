import {Router} from "express";
import multer from "multer";

import {uploadImage} from "../controllers/image";

const image_router = Router();
const image = multer({dest: "../images/"});

// 이미지 업로드
image_router.post("/", image.single("image"), uploadImage);

export default image_router;