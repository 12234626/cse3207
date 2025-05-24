import {Request, Response} from "express";

// 유저 로그인
async function login(req: Request, res: Response) {
  const {id, password} = req.body;

  try {
    const is_valid = (await (await fetch(`http://localhost:3000/db/user?id=${id}&password=${password}`)).json()).length !== 0;
    
    if (!id || !password || !is_valid) {
      res
      .status(404)
      .json({message: "존재하지 않는 유저 아이디 또는 틀린 비밀번호"});

      return;
    }
    
    fetch(`http://localhost:3000/db/user?id=${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      res
      .status(200)
      .json(data[0]);
    })
  } catch (err) {
    res
    .status(500)
    .json({message: err});
  };
}

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
    fetch(`http://localhost:3000/db/club_info_post`, {
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

// 동아리 + 상세 설명 게시글 동시 수정
async function updateClubWithInfoPost(req: Request, res: Response) {
  const {club_id, recruitment, introduction, info_post_id, content} = req.body;

  try {
    // 1. 동아리 정보 수정
    await fetch(`http://localhost:3000/db/club`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: club_id, recruitment, introduction})
    });

    // 2. 상세 설명 게시글 수정
    await fetch(`http://localhost:3000/db/post`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: info_post_id, content})
    });

    res.status(200).json({message: "동아리 및 상세 설명 게시글 수정 성공"});
  } catch (err) {
    res.status(500).json({message: err});
  }
}

// 동아리 가입 신청 업데이트
async function updateClubRequest(req: Request, res: Response) {
  const {id, status} = req.body;

  try {
    await fetch(`http://localhost:3000/db/club_request`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id, status})
    });

    if (status === "수락") {
      const {club_id, user_id} = (await (await fetch(`http://localhost:3000/db/club_request?id=${id}`)).json())[0];

      await fetch(`http://localhost:3000/db/club_member`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({club_id, user_id})
      });
    }

    res
    .status(200)
    .json({message: "동아리 가입 신청 상태 업데이트 성공"});
  } catch (err) {
    res
    .status(500)
    .json({message: err});
  }
}

// 이미지 업로드
async function uploadImage(req: Request, res: Response) {
  try {
    const {path} = req.file as any;

    fetch(`http://localhost:3000/db/image`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({url: path})
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      res
      .status(201)
      .json(data);
    });
  } catch (err) {
    res
    .status(500)
    .json({message: err});
  }
}

export {
  login,
  createClub,
  updateClubRequest,
  updateClubWithInfoPost,
  uploadImage
};
