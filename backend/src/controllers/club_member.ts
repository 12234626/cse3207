import {Request, Response} from "express";

import {buildWhereClause, runQueryWithResponse} from "../utils/controller";

// 동아리 회원 조회
function getClubMember(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query, "club_member_table");
  const query = `
    SELECT 
      club_member_table.club_id,
      user_table.id AS user_id,
      user_table.name,
      user_table.department
    FROM club_member_table
      JOIN user_table ON club_member_table.user_id = user_table.id` + where;
  
  runQueryWithResponse(req, res, query, replacements, 200);
}

// 유저 아이디로 동아리 조회
function getClubByUserId(req: Request, res: Response) {
  const {user_id} = req.params;
  const query = `
    SELECT club_table.*
    FROM club_member_table
      JOIN club_table ON club_member_table.club_id = club_table.id
    WHERE club_member_table.user_id = :user_id`;
  const replacements = {user_id};
  
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
  getClubByUserId,
  createClubMember,
  deleteClubMember
};
