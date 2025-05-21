import {Request, Response} from "express";

import {runQueryWithResponse, buildWhereClause} from "../utils/controller";

// 모든 동아리 조회
function getAllClubs(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query);
  const query = "SELECT * FROM club_table" + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 아이디로 동아리 조회
function getClubById(req: Request, res: Response) {
  const {id} = req.params;
  const query = "SELECT * FROM club_table WHERE id = :id";

  runQueryWithResponse(req, res, query, {id}, 200);
}

// 동아리 관리자 조회
function getClubAdmin(req: Request, res: Response) {
  const {id} = req.params;
  const query = "SELECT admin FROM club_table WHERE id = :id";

  runQueryWithResponse(req, res, query, {id}, 200);
}

// 동아리 생성
function createClub(req: Request, res: Response) {
  const {name, type, field, admin} = req.body;
  const query = "INSERT INTO club_table (name, type, field, admin) VALUES (:name, :type, :field, :admin)";

  runQueryWithResponse(req, res, query, {name, type, field, admin}, 201);
}

// 동아리 업데이트
function updateClub(req: Request, res: Response) {
  const {id} = req.params;
  const {name, type, field, admin} = req.body;
  const query = "UPDATE club_table SET name = :name, type = :type, field = :field, admin = :admin WHERE id = :id";

  runQueryWithResponse(req, res, query, {id, name, type, field, admin}, 200);
}

// 동아리 삭제
function deleteClub(req: Request, res: Response) {
  const {id} = req.params;
  const query = "DELETE FROM club_table WHERE id = :id";
  
  runQueryWithResponse(req, res, query, {id}, 200);
}

export {
  getAllClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub
};
