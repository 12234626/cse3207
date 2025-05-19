import {Request, Response} from "express";

import sequelize from "../models";

// 모든 유저 조회
function getAllUsers(req: Request, res: Response) {
  sequelize
  .query("SELECT * FROM user_table")
  .then(function ([results]) {
    res
    .status(200)
    .json(results);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 아이디로 유저 조회
function getUserById(req: Request, res: Response) {
  const {id} = req.params;

  sequelize
  .query("SELECT * FROM user_table WHERE id = :id", {
    replacements: {id},
  })
  .then(function ([results]) {
    if (results.length === 0) {
      res
      .status(404)
      .json({message: "유저 없음"});

      return;
    }

    res.json(results[0]);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 유저 아이디와 비밀번호가 일치하는지 확인
function checkUserPassword(req: Request, res: Response) {
  const {id, password} = req.query;

  sequelize
  .query("SELECT * FROM user_table WHERE id = :id AND password = :password", {
    replacements: {id, password},
  })
  .then(function ([results]) {
    if (results.length === 0) {
      res
      .status(404)
      .json({message: "유저 없음"});

      return;
    }

    res.json(results[0]);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 유저 생성
function createUser(req: Request, res: Response) {
  const {id, name, password, department, phone} = req.body;

  sequelize
  .query("INSERT INTO user_table (id, name, password, grade, phone) VALUES (:id, :name, :password, :department, :phone)", {
    replacements: {id, name, password, department, phone},
  })
  .then(function ([results]) {
    if (results[1] === 0) {
      res
      .status(400)
      .json({message: "유저 생성 실패"});

      return;
    }

    res
    .status(201)
    .json({message: "유저 생성 성공"});
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 유저 업데이트
function updateUser(req: Request, res: Response) {
  const {id} = req.params;
  const {name, password, department, phone} = req.body;

  sequelize
  .query("UPDATE user_table SET name = :name, password = :password, grade = :department = :department, phone = :phone WHERE id = :id", {
      replacements: {id, name, password, department, phone},
    }
  )
  .then(function ([results]) {
    if (results[1] === 0) {
      res
      .status(404)
      .json({message: "유저 없음"});

      return;
    }

    res
    .status(200)
    .json({message: "유저 업데이트 성공"});
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 유저 삭제
function deleteUser(req: Request, res: Response) {
  const {id} = req.params;

  sequelize
  .query("DELETE FROM user_table WHERE id = :id", {
    replacements: {id},
  })
  .then(function ([results]) {
    if (results[1] === 0) {
      res
      .status(404)
      .json({message: "유저 없음"});

      return;
    }

    res
    .status(200)
    .json({message: "유저 삭제 성공"});
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

export {
  getAllUsers,
  getUserById,
  checkUserPassword,
  createUser,
  updateUser,
  deleteUser
}
