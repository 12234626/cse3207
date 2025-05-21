import {Request, Response} from "express";

import {buildWhereClause, runQueryWithResponse} from "../utils/controller";

// 동아리 회원 조회
function getClubMember(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query);
  const query = "SELECT * FROM club_member_table" + where;
  
  runQueryWithResponse(req, res, query, replacements, 200);
}

// 동아리 회원 생성
function createClubMember(req: Request, res: Response) {
  const {club_id, user_id} = req.body;
  const query = "INSERT INTO club_member_table (club_id, user_id) VALUES (:club_id, :user_id)";
  const replacements = {club_id, user_id};

  runQueryWithResponse(req, res, query, replacements, 201);
}

// 동아리 회원 삭제
function deleteClubMember(req: Request, res: Response) {
  const {user_id, club_id} = req.body;
  const query = "DELETE FROM club_member_table WHERE user_id = :user_id AND club_id = :club_id";
  const replacements = {user_id, club_id};

  runQueryWithResponse(req, res, query, replacements, 200);
}

export {
  getClubMember,
  createClubMember,
  deleteClubMember
};
