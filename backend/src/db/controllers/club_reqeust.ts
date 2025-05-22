import {Request, Response} from "express";

import {runQueryWithResponse, buildWhereClause} from "../utils/controller";

// 동아리 가입 신청 조회
function getAllClubRequests(req: Request, res: Response) {
  const {where, replacements} = buildWhereClause(req.query);
  const query = `
    SELECT 
      club_request_table.club_id,
      user_table.id AS user_id,
      user_table.name,
      user_table.department,
      club_request_table.status
      FROM club_request_table
      JOIN user_table ON club_request_table.user_id = user_table.id
    ${where}
  `;

  runQueryWithResponse(req, res, query, replacements, 200);
}

// 동아리 가입 신청 생성
function createClubRequest(req: Request, res: Response) {
  const {club_id, user_id} = req.body;
  const query = "INSERT INTO club_request_table (club_id, user_id) VALUES (:club_id, :user_id)";
  const replacements = {club_id, user_id};

  runQueryWithResponse(req, res, query, replacements, 201);
}

// 동아리 가입 신청 상태 업데이트
async function updateClubRequestStatus(req: Request, res: Response) {
  try {
    const {id, status} = req.body;
    const query = "UPDATE club_request_table SET status = :status WHERE id = :id";
    const replacements = {id, status};
    const results = await fetch(`http://localhost:3000/db/club_request?id=${id}`);
    const data = await results.json();
    const {club_id, user_id} = data[0];
    
    if (status === "accepted") {
      await fetch(`http://localhost:3000/db/club_member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({club_id, user_id})
      });
    }
    
    runQueryWithResponse(req, res, query, replacements, 200);
  } catch (err) {
    res
    .status(500)
    .json({message: err});
  }
}

// 동아리 가입 신청 삭제
function deleteClubRequest(req: Request, res: Response) {
  const {id} = req.body;
  const query = "DELETE FROM club_request_table WHERE id = :id";
  const replacements = {id};
  
  runQueryWithResponse(req, res, query, replacements, 200);
}

export {
  getAllClubRequests,
  createClubRequest,
  updateClubRequestStatus,
  deleteClubRequest
};
