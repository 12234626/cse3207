import {Request, Response} from "express";

import {runQueryWithResponse, buildWhereClause} from "../utils/controller";

// 이미지 조회
function getImage(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query, "image_table");
  const query = "SELECT * FROM image_table" + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 이미지 생성
function createImage(req: Request, res: Response) {
  const {path} = req.body;
  const query = "INSERT INTO image_table (path) VALUES (:path)";
  const replacements = {path};

  runQueryWithResponse(req, res, query, replacements, 201);
}

// 이미지 업데이트
function updateImage(req: Request, res: Response) {
  const {id, path} = req.body;
  const query = "UPDATE image_table SET path = :path WHERE id = :id";
  const replacements = {id, path};

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 이미지 삭제
function deleteImage(req: Request, res: Response) {
  const {id} = req.body;
  const query = "DELETE FROM image_table WHERE id = :id";
  const replacements = {id};

  runQueryWithResponse(req, res, query, replacements, 200);
}

export {
  getImage,
  createImage,
  updateImage,
  deleteImage
};
