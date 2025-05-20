import {Request, Response} from "express";

import sequelize from "../models";

// 모든 동아리 조회
function getAllClubs(req: Request, res: Response) {
  const {type, field} = req.query;
  let query = "SELECT * FROM club_table";
  const replacements: any = {};
  const conditions: string[] = [];

  if (type) {
    conditions.push("type = :type");
    replacements.type = type;
  }
  if (field) {
    conditions.push("field = :field");
    replacements.field = field;
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
// 아이디로 동아리 조회
function getClubById(req: Request, res: Response) {
  const {id} = req.params;

  sequelize
  .query("SELECT * FROM club_table WHERE id = :id", {
    replacements: {id},
  })
  .then(function ([results]) {
    if (results.length === 0) {
      res
      .status(404)
      .json({message: "동아리 없음"});

      return;
    }

    res.json(results[0]);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 동아리 관리자 조회
function getClubAdmin(req: Request, res: Response) {
  const {id} = req.params;

  sequelize
  .query("SELECT admin FROM club_table WHERE id = :id", {
    replacements: {id},
  })
  .then(function ([results]: [any[], any]) {
    if (results.length === 0) {
      res
      .status(404)
      .json({message: "동아리 없음"});

      return;
    }

    res
    .status(200)
    .json({admin: results[0].admin});
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 동아리 생성
function createClub(req: Request, res: Response) {
  const {name, type, field, admin} = req.body;

  sequelize
  .query("INSERT INTO club_table (name, type, field, admin) VALUES (:name, :type, :field, :admin)", {
    replacements: {name, type, field, admin},
  })
  .then(function ([results]) {
    res
    .status(201)
    .json(results);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 동아리 업데이트
function updateClub(req: Request, res: Response) {
  const {id} = req.params;
  const {name, type, field, admin} = req.body;

  sequelize
  .query("UPDATE club_table SET name = :name, type = :type, field = :field, admin = :admin WHERE id = :id", {
    replacements: {id, name, type, field, admin},
  })
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
// 동아리 삭제
function deleteClub(req: Request, res: Response) {
  const {id} = req.params;

  sequelize
  .query("DELETE FROM club_table WHERE id = :id", {
    replacements: {id},
  })
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

export {
  getAllClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub
};
