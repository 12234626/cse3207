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
  const {url} = req.body;
  const query = "INSERT INTO image_table (url) VALUES (:url)";
  const replacements = {url};

  runQueryWithResponse(req, res, query, replacements, 201);
}

// 이미지 업데이트
function updateImage(req: Request, res: Response) {
  const {id, url} = req.body;
  const query = "UPDATE image_table SET url = :url WHERE id = :id";
  const replacements = {id, url};

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
