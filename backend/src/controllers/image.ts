import {Request, Response} from "express";

import Image from "../models/models/image";

// 이미지 조회
function getImage(req: Request, res: Response) {
  Image
  .findAll({where: req.query})
  .then(function (data) {
    res
    .status(200)
    .json(data);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

// 이미지 생성
function createImage(req: Request, res: Response) {
  const {path} = req.body;
  
  Image
  .create({path})
  .then(function (data) {
    res
    .status(201)
    .json(data);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

// 이미지 업데이트
function updateImage(req: Request, res: Response) {
  const {id, path} = req.body;
  
  Image
  .update({path}, {where: {id}})
  .then(function (data) {
    res
    .status(200)
    .json(data);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

// 이미지 삭제
function deleteImage(req: Request, res: Response) {
  const {id} = req.body;
  
  Image
  .destroy({where: {id}})
  .then(function (data) {
    res
    .status(200)
    .json(data);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

export {
  getImage,
  createImage,
  updateImage,
  deleteImage
};
