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
  const query = "SELECT admin_user_id FROM club_table" + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 동아리 게시글 조회
function getPost(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query, "post_table");
  const query = `
    SELECT
      post_table.*,
      club_table.name AS club_name
    FROM club_table
      JOIN post_table ON club_table.id = post_table.club_id` + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 동아리 생성
function createClub(req: Request, res: Response) {
  const {name, type, field, admin_user_id, recruitment, introduction} = req.body;
  const query = "INSERT INTO club_table (name, type, field, recruitment, introduction, admin_user_id) VALUES (:name, :type, :field, :recruitment, :introduction, :admin_user_id)";
  const replacements = {name, type, field, admin_user_id, recruitment, introduction};

  runQueryWithResponse(req, res, query, replacements, 201);
}

// 동아리 업데이트
function updateClub(req: Request, res: Response) {
  const {id, recruitment, introduction} = req.body;
  const query = "UPDATE club_table SET recruitment = :recruitment, introduction = :introduction WHERE id = :id";
  const replacements = {id,recruitment, introduction};

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
  getPost,
  createClub,
  updateClub,
  deleteClub
};
