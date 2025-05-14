import {Request, Response} from "express";

import sequelize from "../models";

// 동아리에 가입 신청한 모든 유저 조회
function getAllClubRequests(req: Request, res: Response) {
  const {club_id} = req.params;

  sequelize
  .query("SELECT * FROM club_request_table WHERE club_id = :club_id", {
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
// 유저가 가입 신청한 모든 동아리 조회
function getAllUserRequests(req: Request, res: Response) {
  const {user_id} = req.params;

  sequelize
  .query("SELECT * FROM club_request_table WHERE user_id = :user_id", {
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
// 가입 신청 상태 업데이트
function updateClubRequestStatus(req: Request, res: Response) {
  const {user_id, club_id, status} = req.body;

  sequelize
  .query("UPDATE club_request_table SET status = :status WHERE user_id = :user_id AND club_id = :club_id", {
    replacements: {user_id, club_id, status},
  })
  .then(function ([results]) {
    if (results[1] === 0) {
      res
      .status(404)
      .json({message: "동아리 없음"});

      return;
    }

    res
    .status(200)
    .json({message: "동아리 가입 신청 상태 업데이트 성공"});
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 동아리 가입 신청 삭제
function deleteClubRequest(req: Request, res: Response) {
  const {id} = req.params;

  sequelize
  .query("DELETE FROM club_request_table WHERE id = :id", {
    replacements: {id},
  })
  .then(function ([results]) {
    if (results[1] === 0) {
      res
      .status(404)
      .json({message: "동아리 가입 신청 없음"});

      return;
    }

    res
    .status(200)
    .json({message: "동아리 가입 신청 삭제 성공"});
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

export {
  getAllClubRequests,
  getAllUserRequests,
  updateClubRequestStatus,
  deleteClubRequest
};
