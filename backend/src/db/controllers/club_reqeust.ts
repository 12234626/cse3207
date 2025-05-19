import {Request, Response} from "express";

import sequelize from "../models";

// 동아리에 가입 신청한 모든 유저 조회
function getAllClubRequests(req: Request, res: Response) {
  const {club_id, user_id} = req.query;
  let query = "SELECT * FROM club_table";
  const replacements: any = {};
  const conditions: string[] = [];

  if (club_id) {
    conditions.push("club_id = :club_id");
    replacements.club_id = club_id;
  }
  if (user_id) {
    conditions.push("user_id = :user_id");
    replacements.user_id = user_id;
  }
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  sequelize
  .query(query, {replacements})
  .then(function ([results]) {
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
// 동아리 가입 신청 생성
function createClubRequest(req: Request, res: Response) {
  const {user_id, club_id} = req.params;

  sequelize
  .query("INSERT INTO club_request_table (user_id, club_id) VALUES (:user_id, :club_id)", {
    replacements: {user_id, club_id},
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
    .json({message: "동아리 가입 신청 성공"});
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
  createClubRequest,
  updateClubRequestStatus,
  deleteClubRequest
};
