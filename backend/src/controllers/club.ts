import {Request, Response} from "express";
import * as fs from 'fs';
import * as path from 'path';

// 동아리 생성
function create(req: Request, res: Response) {
}
// 동아리 게시글 조회
function post(req: Request, res: Response) {
}
// 동아리 정보 조회
function info(req: Request, res: Response) {
}
// 동아리 페이지 조회
function page(req: Request, res: Response) {
}
// 동아리 관리자 페이지
function admin(req: Request, res: Response) {
}
// 동아리 멤버 정보 조회
function member(req: Request, res: Response) {
}
// 동아리 가입 요청 조회
function request(req: Request, res: Response) {
}
// 동아리 글쓰기
function write(req: Request, res: Response) {
}

// 모든 동아리 정보 조회
function getAllClubs(req: Request, res: Response) {
  try {
    const clubData = fs.readFileSync(
      path.join(__dirname, '../db/init/data/club_table.json'),
      'utf8'
    );
    const clubs = JSON.parse(clubData);
    res.json(clubs);
  } catch (error) {
    console.error('Error reading club data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export {
  create,
  post,
  info,
  page,
  admin,
  member,
  request,
  write,
  getAllClubs
};
