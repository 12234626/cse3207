import {Request, Response} from "express";

import ClubRequest from "../models/models/club_request";
import User from "../models/models/user";
import Club from "../models/models/club";

// 동아리 가입 신청 조회
function getClubRequest(req: Request, res: Response) {
  ClubRequest
  .findAll({where: req.query, include: [{model: User}, {model: Club}]})
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

// 동아리 가입 신청 생성
function createClubRequest(req: Request, res: Response) {
  const {club_id, user_id} = req.body;
  
  ClubRequest
  .create({club_id, user_id})
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

// 동아리 가입 신청 상태 업데이트
async function updateClubRequestStatus(req: Request, res: Response) {
  const {id, status} = req.body;
  
  ClubRequest
  .update({status}, {where: {id}})
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

// 동아리 가입 신청 삭제
function deleteClubRequest(req: Request, res: Response) {
  const {id} = req.body;
  
  ClubRequest
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
  getClubRequest,
  createClubRequest,
  updateClubRequestStatus,
  deleteClubRequest
};
