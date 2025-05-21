import {Request, Response} from "express";

import {runQueryWithResponse, buildWhereClause} from "../utils/controller";

// 동아리 조회
function getClub(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query);
  const query = "SELECT * FROM club_table" + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 동아리 관리자 조회
function getClubAdmin(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query);
  const query = "SELECT admin FROM club_table" + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 유저 아이디로 동아리 조회
function getClubByUser(req: Request, res: Response) {
  const {user_id} = req.params;
  const query = "SELECT club_table.* FROM club_table INNER JOIN club_member_table ON club_table.id = club_member_table.club_id WHERE club_member_table.user_id = :user_id";
  const replacements = {user_id};

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 동아리 생성
function createClub(req: Request, res: Response) {
  const {name, type, field, admin} = req.body;
  const query = "INSERT INTO club_table (name, type, field, admin) VALUES (:name, :type, :field, :admin)";
  const replacements = {name, type, field, admin};

  runQueryWithResponse(req, res, query, replacements, 201);
}

// 동아리 업데이트
function updateClub(req: Request, res: Response) {
  const {id, name, type, field, admin} = req.body;
  const query = "UPDATE club_table SET name = :name, type = :type, field = :field, admin = :admin WHERE id = :id";
  const replacements = {id, name, type, field, admin};

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 동아리 삭제
function deleteClub(req: Request, res: Response) {
  const {id} = req.body;
  const query = "DELETE FROM club_table WHERE id = :id";
  const replacements = {id};

  runQueryWithResponse(req, res, query, replacements, 200);
}

export {
  getClub,
  getClubAdmin,
  getClubByUser,
  createClub,
  updateClub,
  deleteClub
};
