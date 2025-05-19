import {Request, Response} from "express";

import sequelize from "../models";

// 동아리에 가입한 모든 유저 조회
function getAllClubMembers(req: Request, res: Response) {
  const {club_id} = req.params;

  sequelize
  .query("SELECT * FROM club_member_table WHERE club_id = :club_id", {
    replacements: {club_id},
  })
  .then(function ([results]) {
    if (results.length === 0) {
      res
      .status(404)
      .json({message: "동아리 없음"});

      return;
    }

    res
    .status(200)
    .json(results);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 유저가 가입한 모든 동아리 조회
function getAllUserClubs(req: Request, res: Response) {
  const {user_id} = req.params;

  sequelize
  .query("SELECT * FROM club_member_table WHERE user_id = :user_id", {
    replacements: {user_id},
  })
  .then(function ([results]) {
    if (results.length === 0) {
      res
      .status(404)
      .json({message: "유저 없음"});

      return;
    }

    res
    .status(200)
    .json(results);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 동아리 가입
function createClubMember(req: Request, res: Response) {
  const {club_id, user_id} = req.body;

  sequelize
  .query("INSERT INTO club_member_table (club_id, user_id) VALUES (:club_id, :user_id)", {
    replacements: {club_id, user_id},
  })
  .then(function ([results]) {
    if (results[1] === 0) {
      res
      .status(400)
      .json({message: "동아리 가입 실패"});

      return;
    }

    res
    .status(201)
    .json({message: "동아리 가입 성공"});
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 동아리 탈퇴
function deleteClubMember(req: Request, res: Response) {
  const {user_id, club_id} = req.body;

  sequelize
  .query("DELETE FROM club_member_table WHERE user_id = :user_id AND club_id = :club_id", {
    replacements: {user_id, club_id},
  })
  .then(function ([results]) {
    if (results[1] === 0) {
      res
      .status(404)
      .json({message: "동아리 가입 정보 없음"});

      return;
    }

    res
    .status(200)
    .json({message: "동아리 탈퇴 성공"});
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

export {
  getAllClubMembers,
  getAllUserClubs,
  createClubMember,
  deleteClubMember
};
