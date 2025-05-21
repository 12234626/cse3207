import {Request, Response} from "express";

import {runQueryWithResponse, buildWhereClause} from "../utils/controller";

// 모든 게시글 조회
function getPosts(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query);
  const query = "SELECT * FROM post_table" + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 게시글 생성
function createPost(req: Request, res: Response) {
  const { id, type, title, content, club_id } = req.body;
  const query = "INSERT INTO post_table (id, type, title, content, club_id) VALUES (:id, :type, :title, :content, :club_id)";

  runQueryWithResponse(req, res, query, { id, type, title, content, club_id }, 201);
}

// 게시글 업데이트
function updatePost(req: Request, res: Response) {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = "UPDATE post_table SET title = :title, content = :content WHERE id = :id";
  
  runQueryWithResponse(req, res, query, { id, title, content }, 200);
}

// 게시글 삭제
function deletePost(req: Request, res: Response) {
  const { id } = req.params;
  const query = "DELETE FROM post_table WHERE id = :id";

  runQueryWithResponse(req, res, query, { id }, 200);
}

export {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
