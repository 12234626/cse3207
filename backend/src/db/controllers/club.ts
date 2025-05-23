import {Request, Response} from "express";

import {runQueryWithResponse, buildWhereClause} from "../utils/controller";

// 동아리 조회
function getClub(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query, "club_table");
  const query = "SELECT * FROM club_table" + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 동아리 관리자 조회
function getClubAdmin(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query, "club_table");
  const query = "SELECT admin FROM club_table" + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 동아리 생성
function createClub(req: Request, res: Response) {
  const {name, type, field, admin, inrecruitment, introduction, info} = req.body;

  const query = "INSERT INTO club_table (name, type, field, admin, inrecruitment, introduction, info) VALUES (:name, :type, :field, :admin, :inrecruitment, :introduction, :info)";
  const replacements = {name, type, field, admin, inrecruitment, introduction, info};

  runQueryWithResponse(req, res, query, replacements, 201);
}

// 동아리 업데이트
function updateClub(req: Request, res: Response) {
  const {id, name, type, field, admin, inrecruitment} = req.body;
  const query = "UPDATE club_table SET name = :name, type = :type, field = :field, admin = :admin,inrecruitment = :inrecruitment WHERE id = :id";
  const replacements = {id, name, type, field, admin, inrecruitment};

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
  createClub,
  updateClub,
  deleteClub
};
