import {Request, Response} from "express";

import {runQueryWithResponse, buildWhereClause} from "../utils/controller";

// 모든 유저 조회
function getAllUsers(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query);
  const query = "SELECT * FROM user_table" + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 아이디로 유저 조회
function getUserById(req: Request, res: Response) {
  const {id} = req.params;
  const query = "SELECT * FROM user_table WHERE id = :id";

  runQueryWithResponse(req, res, query, {id}, 200);
}

// 유저 아이디와 비밀번호가 일치하는지 확인
function checkUserPassword(req: Request, res: Response) {
  const {id, password} = req.query;
  const query = "SELECT * FROM user_table WHERE id = :id AND password = :password";

  runQueryWithResponse(req, res, query, {id, password}, 200);
}

// 유저 생성
function createUser(req: Request, res: Response) {
  const {id, name, password, department, phone} = req.body;
  const query = "INSERT INTO user_table (id, name, password, department, phone) VALUES (:id, :name, :password, :department, :phone)";

  runQueryWithResponse(req, res, query, {id, name, password, department, phone}, 201);
}

// 유저 업데이트
function updateUser(req: Request, res: Response) {
  const {id, name, password, department, phone} = req.body;
  const query = "UPDATE user_table SET name = :name, password = :password, department = :department, phone = :phone WHERE id = :id";

  runQueryWithResponse(req, res, query, {id, name, password, department, phone}, 200);
}

// 유저 삭제
function deleteUser(req: Request, res: Response) {
  const {id} = req.params;
  const query = "DELETE FROM user_table WHERE id = :id";

  runQueryWithResponse(req, res, query, {id}, 200);
}

export {
  getAllUsers,
  getUserById,
  checkUserPassword,
  createUser,
  updateUser,
  deleteUser
}
