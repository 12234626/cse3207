import { Router } from "express";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // uploads 폴더에 저장
const router = Router();

router.post("/", upload.single("image"), (req, res) => {
  const file = req.file as Express.Multer.File;
  res.json({ imageUrl: `/uploads/${file.filename}` });
});

export default router;