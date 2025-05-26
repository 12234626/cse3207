import {Request, Response} from "express";

import Club from "../models/models/club";
import User from "../models/models/user";

// 동아리 조회
function getClub(req: Request, res: Response) {
  Club
  .findAll({where: req.query, include: [{model: User}]})
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

// 동아리 생성
function createClub(req: Request, res: Response) {
  const {name, type, field, admin_user_id, recruitment, introduction, image_id} = req.body;
  
  Club
  .create({name, type, field, admin_user_id, recruitment, introduction, image_id})
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

// 동아리 업데이트
function updateClub(req: Request, res: Response) {
  const {id, recruitment, introduction} = req.body;
  
  Club
  .update({recruitment, introduction}, {where: {id}})
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

// 동아리 삭제
function deleteClub(req: Request, res: Response) {
  const {id} = req.body;

  Club
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
  getClub,
  createClub,
  updateClub,
  deleteClub
};
