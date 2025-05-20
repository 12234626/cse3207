import {Request, Response} from "express";

import sequelize from "../models";

// 모든 게시글 조회
function getPosts(req: Request, res: Response) {
  const {id, type, clue_id} = req.query;
  let query = "SELECT * FROM post_table";
  const replacements: any = {};
  const conditions: string[] = [];

  if (id) {
    conditions.push("id = :id");
    replacements.id = id;
  }
  if (type) {
    conditions.push("type = :type");
    replacements.type = type;
  }
  if (clue_id) {
    conditions.push("clue_id = :clue_id");
    replacements.clue_id = clue_id;
  }
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  sequelize
  .query(query, {replacements})
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
// 게시글 생성
function createPost(req: Request, res: Response) {
  const {id, type, title, content, club_id} = req.body;

  sequelize
  .query("INSERT INTO post_table (id, type, title, content, club_id) VALUES (:id, :type, :title, :content, :club_id)", {
    replacements: {id, type, title, content, club_id},
  })
  .then(function ([results]) {
    if (results[1] === 0) {
      res
      .status(400)
      .json({message: "게시글 생성 실패"});

      return;
    }
    
    res
    .status(201)
    .json({message: "게시글 생성 성공"});
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 게시글 업데이트
function updatePost(req: Request, res: Response) {
  const {id} = req.params;
  const {title, content} = req.body;

  sequelize
  .query("UPDATE post_table SET title = :title, content = :content WHERE id = :id", {
    replacements: {id, title, content},
  })
  .then(function ([results]) {
    if (results[1] === 0) {
      res
      .status(404)
      .json({message: "게시글 없음"});

      return;
    }

    res
    .status(200)
    .json({message: "게시글 업데이트 성공"});
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}
// 게시글 삭제
function deletePost(req: Request, res: Response) {
  const {id} = req.params;
  
  sequelize
  .query("DELETE FROM post_table WHERE id = :id", {
    replacements: {id},
  })
  .then(function ([results]) {
    if (results[1] === 0) {
      res
      .status(404)
      .json({message: "게시글 없음"});

      return;
    }

    res
    .status(200)
    .json({message: "게시글 삭제 성공"});
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

export {
  getPosts,
  createPost,
  updatePost,
  deletePost
};
