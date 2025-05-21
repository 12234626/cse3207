import {Request, Response} from "express";

import {runQueryWithResponse} from "../utils/controller";

// 동아리에 가입한 모든 유저 조회
function getAllClubMembers(req: Request, res: Response) {
  const {club_id} = req.params;
  const query = "SELECT * FROM club_member_table WHERE club_id = :club_id";

  runQueryWithResponse(req, res, query, {club_id}, 200);
}

// 유저가 가입한 모든 동아리 조회
function getAllUserClubs(req: Request, res: Response) {
  const {user_id} = req.params;
  const query = "SELECT * FROM club_member_table WHERE user_id = :user_id";

  runQueryWithResponse(req, res, query, {user_id}, 200);
}

// 동아리 가입
function createClubMember(req: Request, res: Response) {
  const {club_id, user_id} = req.body;
  const query = "INSERT INTO club_member_table (club_id, user_id) VALUES (:club_id, :user_id)";

  runQueryWithResponse(req, res, query, {club_id, user_id}, 201);
}

// 동아리 탈퇴
function deleteClubMember(req: Request, res: Response) {
  const {user_id, club_id} = req.body;
  const query = "DELETE FROM club_member_table WHERE user_id = :user_id AND club_id = :club_id";

  runQueryWithResponse(req, res, query, {user_id, club_id}, 200);
}

export {
  getAllClubMembers,
  getAllUserClubs,
  createClubMember,
  deleteClubMember
};
