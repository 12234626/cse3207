import {Request, Response} from "express";

import {buildWhereClause, runQueryWithResponse} from "../utils/controller";

// 동아리 상세 설명 게시글 조회
function getClubInfoPost(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query, "club_info_post_table");
  const query = `
    SELECT *
    FROM club_info_post_table` + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 동아리 상세 설명 게시글 생성
function createClubInfoPost(req: Request, res: Response) {
  const {club_id, info_post_id} = req.body;
  const query = `
    INSERT INTO club_info_post_table (club_id, info_post_id)
    VALUES (:club_id, :info_post_id)`;
  const replacements = {club_id, info_post_id};

  runQueryWithResponse(req, res, query, replacements, 201);
}

// 동아리 상세 설명 게시글 업데이트
function updateClubInfoPost(req: Request, res: Response) {
  const {id, club_id, info_post_id} = req.body;
  const query = `
    UPDATE club_info_post_table
    SET club_id = :club_id, info_post_id = :info_post_id
    WHERE id = :id`;
  const replacements = {id, club_id, info_post_id};

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 동아리 상세 설명 게시글 삭제
function deleteClubInfoPost(req: Request, res: Response) {
  const {id} = req.body;
  const query = `
    DELETE FROM club_info_post_table
    WHERE id = :id`;
  const replacements = {id};

  runQueryWithResponse(req, res, query, replacements, 200);
}


export {
  getClubInfoPost,
  createClubInfoPost,
  updateClubInfoPost,
  deleteClubInfoPost  
};
