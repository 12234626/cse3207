import {Request, Response} from "express";

import {runQueryWithResponse, buildWhereClause} from "../utils/controller";

// 동아리에 가입 신청한 모든 유저 조회
function getAllClubRequests(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query);
  const query = "SELECT * FROM club_table" + where;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 동아리 가입 신청 생성
function createClubRequest(req: Request, res: Response) {
  const {user_id, club_id} = req.body;
  const query = "INSERT INTO club_request_table (user_id, club_id) VALUES (:user_id, :club_id)";

  runQueryWithResponse(req, res, query, {user_id, club_id}, 200);
}

// 동아리 가입 신청 상태 업데이트
function updateClubRequestStatus(req: Request, res: Response) {
  const {club_id, user_id, status} = req.body;
  const query = "UPDATE club_request_table SET status = :status WHERE club_id = :club_id AND user_id = :user_id";

  runQueryWithResponse(req, res, query, {club_id, user_id, status}, 200);
}

// 동아리 가입 신청 삭제
function deleteClubRequest(req: Request, res: Response) {
  const {id} = req.params;
  const query = "DELETE FROM club_request_table WHERE id = :id";
  
  runQueryWithResponse(req, res, query, {id}, 200);
}

export {
  getAllClubRequests,
  createClubRequest,
  updateClubRequestStatus,
  deleteClubRequest
};
