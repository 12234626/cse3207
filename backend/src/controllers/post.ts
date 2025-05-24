import {Request, Response} from "express";

import {runQueryWithResponse, buildWhereClause} from "../utils/controller";

// 게시글 조회
function getPost(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query, "post_table");
  const query = "SELECT * FROM post_table" + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 게시글 생성
function createPost(req: Request, res: Response) {
  const {type, title, content, club_id} = req.body;
  const query = "INSERT INTO post_table (type, title, content, club_id) VALUES (:type, :title, :content, :club_id)";
  const replacements = {type, title, content, club_id};

  runQueryWithResponse(req, res, query, replacements, 201);
}

// 게시글 업데이트
function updatePost(req: Request, res: Response) {
  const {id, title, content, image_set_id} = req.body;
  const query = "UPDATE post_table SET title = :title, content = :content, image_set_id = :image_set_id WHERE id = :id";
  const replacements = {id, title, content, image_set_id};
  
  runQueryWithResponse(req, res, query, replacements, 200);
}

// 게시글 삭제
function deletePost(req: Request, res: Response) {
  const {id} = req.body;
  const query = "DELETE FROM post_table WHERE id = :id";
  const replacements = {id};

  runQueryWithResponse(req, res, query, replacements, 200);
}

export {
  getPost,
  createPost,
  updatePost,
  deletePost
};
