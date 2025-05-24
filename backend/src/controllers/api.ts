import {Request, Response} from "express";

// 동아리 생성
async function createClub(req: Request, res: Response) {
  const {name, type, field, recruitment, introduction, admin_user_id, title, content} = req.body;

  try {
    const club_id = await (await fetch(`http://localhost:3000/db/club`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, type, field, recruitment, introduction, admin_user_id})
    })).json();
    const info_post_id = await (await fetch(`http://localhost:3000/db/post`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({type: "상세 설명", title, content, club_id})
    })).json();
    fetch(`http://localhost:3000/db/club/info_post_id`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: club_id, info_post_id: info_post_id})
    });
    fetch(`http://localhost:3000/db/club_member`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({club_id, user_id: admin_user_id})
    });

    res
    .status(201)
    .json({message: "동아리 생성 성공"});
  } catch (err) {
    res
    .status(500)
    .json({message: err});
  }
}

export {
  createClub
};
