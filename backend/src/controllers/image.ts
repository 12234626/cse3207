import {Request, Response} from "express";

// 이미지 업로드
function uploadImage(req: Request, res: Response) {
  const file = req.file as Express.Multer.File;
  res.json({ imageUrl: `/images/${file.filename}` });
}

export {
  uploadImage
};
