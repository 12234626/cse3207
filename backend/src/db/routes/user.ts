import {Router, Request, Response, NextFunction} from "express";

import sequelize from "../models/index";

const asyncMiddleware = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 유저 데이터베이스 라우터
const user_router = Router();

// 모든 유저 조회
user_router.get("/", async function (req: Request, res: Response) {
  try {
    const [users] = await sequelize.query("SELECT * FROM user_table");

    console.log(users);

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 특정 유저 조회
user_router.get("/:id", asyncMiddleware(async function (req: Request, res: Response) {
  const { id } = req.params;
  try {
    const [user] = await sequelize.query("SELECT * FROM user_table WHERE id = :id", {
      replacements: { id },
    });
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user[0]);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}));

// 유저 생성
user_router.post("/", async function (req: Request, res: Response) {
  const { name, password } = req.body;
  try {
    await sequelize.query(
      "INSERT INTO users (name, password, createdAt, updatedAt) VALUES (:name, :password, NOW(), NOW())",
      {
        replacements: { name, password },
      }
    );
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 유저 업데이트
user_router.put("/:id", asyncMiddleware(async function (req: Request, res: Response) {
  const { id } = req.params;
  const { name, password } = req.body;
  try {
    const [result] = await sequelize.query(
      "UPDATE users SET name = :name, password = :password, updatedAt = NOW() WHERE id = :id",
      {
        replacements: { id, name, password },
      }
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}));

// 유저 삭제
user_router.delete("/:id", asyncMiddleware(async function (req: Request, res: Response) {
  const { id } = req.params;
  try {
    const [result] = await sequelize.query("DELETE FROM user_table WHERE id = :id", {
      replacements: { id },
    });
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}));

export default user_router;