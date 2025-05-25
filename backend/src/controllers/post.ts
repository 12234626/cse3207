import {Request, Response} from "express";

import Post from "../models/models/post";
import Club from "../models/models/club";
import Image from "../models/models/image";

// 게시글 조회
function getPost(req: Request, res: Response) {
  Post
  .findAll({where: req.query, include: [{model: Club}, {model: Image}]})
  .then(function (data) {
    res
    .status(200)
    .json(data);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

// 동아리로 게시글 조회
function getPostByClub(req: Request, res: Response) {
  Club
  .findAll({where: req.query})
  .then(function (data) {
    return data.map(function (data) {
      return data.id;
    })
  })
  .then(function (data) {
    Post
    .findAll({where: {club_id: data}, include: [{model: Club}, {model: Image}]})
    .then(function (data) {
      res
      .status(200)
      .json(data);
    });
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

// 게시글 생성
function createPost(req: Request, res: Response) {
  const {type, title, content, club_id, image_id} = req.body;
  
  console.log(req.body);

  Post
  .create({type, title, content, club_id, image_id})
  .then(function (data) {
    res
    .status(201)
    .json(data);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

// 게시글 업데이트
function updatePost(req: Request, res: Response) {
  const {id, content, image_id} = req.body;
  
  Post
  .update({content, image_id}, {where: {id}})
  .then(function (data) {
    res
    .status(200)
    .json(data);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

// 게시글 삭제
function deletePost(req: Request, res: Response) {
  const {id} = req.body;
  
  Post
  .destroy({where: {id}})
  .then(function (data) {
    res
    .status(200)
    .json(data);
  })
  .catch(function (err) {
    res
    .status(500)
    .json({message: err});
  });
}

export {
  getPost,
  getPostByClub,
  createPost,
  updatePost,
  deletePost
};
