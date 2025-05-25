import {Request, Response} from "express";

import ClubMember from "../models/models/club_member";
import User from "../models/models/user";
import Club from "../models/models/club";

// 동아리 회원 조회
function getClubMember(req: Request, res: Response) {
  ClubMember
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

// 유저로 동아리 회원 조회
function getClubMemberByUser(req: Request, res: Response) {
  User
  .findAll({where: req.query})
  .then(function (data) {
    return data.map(function (data) {
      return data.id;
    });
  })
  .then(function (data) {
    ClubMember
    .findAll({where: {user_id: data}, include: [{model: User}, {model: Club}]})
    .then(function (data) {
      res
      .status(200)
      .json(data);
    });
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

// 동아리 회원 생성
function createClubMember(req: Request, res: Response) {
  const {club_id, user_id} = req.body;
  
  ClubMember
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

// 동아리 회원 삭제
function deleteClubMember(req: Request, res: Response) {
  const {user_id, club_id} = req.body;
  
  ClubMember
  .destroy({where: {user_id, club_id}})
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
  getClubMember,
  getClubMemberByUser,
  createClubMember,
  deleteClubMember
};
