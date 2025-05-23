import { Request, Response } from "express";

import { runQueryWithResponse, buildWhereClause } from "../utils/controller";

// 유저 조회
function getUser(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query, "user_table");
  const query = "SELECT * FROM user_table" + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 유저 생성
function createUser(req: Request, res: Response) {
  const {id, name, password, department, phone} = req.body;

  // 전화번호 유효성 검사
  const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: "전화번호는 반드시 하이픈(-)을 포함해야 합니다. 예: 010-1234-5678" });
  }

  const query = "INSERT INTO user_table (id, name, password, department, phone) VALUES (:id, :name, :password, :department, :phone)";
  const replacements = {id, name, password, department, phone};

  runQueryWithResponse(req, res, query, replacements, 201);
}

// 유저 아이디와 비밀번호가 일치하는지 확인
function checkUserPassword(req: Request, res: Response) {
  const {id, password} = req.body;
  const query = "SELECT * FROM user_table WHERE id = :id AND password = :password";
  const replacements = {id, password};

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 유저 업데이트
function updateUser(req: Request, res: Response) {
  const {id, name, password, department, phone} = req.body;
  const query = "UPDATE user_table SET name = :name, password = :password, department = :department, phone = :phone WHERE id = :id";
  const replacements = {id, name, password, department, phone};

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 유저 삭제
function deleteUser(req: Request, res: Response) {
  const {id} = req.body;
  const query = "DELETE FROM user_table WHERE id = :id";
  const replacements = {id};

  runQueryWithResponse(req, res, query, replacements, 200);
}

export {
  getUser,
  checkUserPassword,
  createUser,
  updateUser,
  deleteUser 
};
