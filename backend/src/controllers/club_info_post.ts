import {Request, Response} from "express";

import ClubInfoPost from "../models/models/club_info_post";
import Club from "../models/models/club";
import Post from "../models/models/post";

// 동아리 상세 설명 게시글 조회
function getClubInfoPost(req: Request, res: Response) {
  ClubInfoPost
  .findAll({where: req.query, include: [{model: Club}, {model: Post}]})
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

// 동아리 상세 설명 게시글 생성
function createClubInfoPost(req: Request, res: Response) {
  const {club_id, info_post_id} = req.body;
  
  ClubInfoPost
  .create({club_id, info_post_id})
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

// 동아리 상세 설명 게시글 업데이트
function updateClubInfoPost(req: Request, res: Response) {
  const {id, club_id, info_post_id} = req.body;
  
  ClubInfoPost
  .update({club_id, info_post_id}, {where: {id}})
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

// 동아리 상세 설명 게시글 삭제
function deleteClubInfoPost(req: Request, res: Response) {
  const {id} = req.body;
  
  ClubInfoPost
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
  getClubInfoPost,
  createClubInfoPost,
  updateClubInfoPost,
  deleteClubInfoPost  
};
