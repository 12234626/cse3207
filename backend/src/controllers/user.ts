import {Request, Response} from "express";

import User from "../models/models/user";
import Image from "../models/models/image";

// 유저 조회
function getUser(req: Request, res: Response) {
  User
  .findAll({where: req.query, include: [{model: Image}]})
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

// 유저 생성
function createUser(req: Request, res: Response) {
  const {id, name, password, department, phone} = req.body;

  User
  .create({id, name, password, department, phone})
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

// 유저 아이디와 비밀번호가 일치하는지 확인
function checkUserPassword(req: Request, res: Response) {
  const {id, password} = req.body;
  
  User
  .findOne({where: {id, password}})
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

// 유저 업데이트
function updateUser(req: Request, res: Response) {
  const {id, name, password, department, phone, image_id} = req.body;
  
  User
  .update({name, password, department, phone, image_id}, {where: {id}})
  .then(function (data) {
    res
    .status(200)
    .json(data);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  }
  );
}

// 유저 삭제
function deleteUser(req: Request, res: Response) {
  const {id} = req.body;
  
  User
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
  getUser,
  checkUserPassword,
  createUser,
  updateUser,
  deleteUser 
};
