import {Request, Response} from "express";
import crypto from "crypto";

// 이미지 조회
async function getImageUrl(req: Request, res: Response) {
  try {
    const {id} = req.query;

    fetch(`http://localhost:3000/db/image?id=${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      res
      .status(200)
      .json(data.map(function (image: {path: string}) {
        return `http://localhost:3000/${image.path}`;
      }));
    });
  } catch (err) {
    res
    .status(500)
    .json({message: err});
  }
}

// 이미지 생성
async function createImage(req: Request, res: Response) {
  try {
    const {path} = req.body;

    fetch(`http://localhost:3000/db/image`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({path: path.replace(/\\/g, "/")})
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

// 동아리 및 상세 설명 게시글 생성
async function createClub(req: Request, res: Response) {
  try {
    const {name, type, field, recruitment, introduction, admin_user_id, title, content} = req.body;
    let image_id = null;

    if (req.file) {
      const {path} = req.file as any;
      
      const image = await (await fetch(`http://localhost:3000/api/image`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({path})
      })).json();

      image_id = image.id;
    }

    const club = await (await fetch(`http://localhost:3000/db/club`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, type, field, recruitment, introduction, admin_user_id})
    })).json();
    const info_post = await (await fetch(`http://localhost:3000/db/post`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({type: "상세 설명", title, content, club_id: club.id, image_id})
    })).json();

    await fetch(`http://localhost:3000/db/club_info_post`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({club_id: club.id, info_post: info_post})
    });
    await fetch(`http://localhost:3000/db/club_member`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({club_id: club.id, user_id: admin_user_id})
    });

    fetch(`http://localhost:3000/db/club?id=${club.id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      res
      .status(201)
      .json(data[0]);
    });
  } catch (err) {
    res
    .status(500)
    .json({message: err});
  }
}

// 동아리 및 상세 설명 게시글 수정
async function updateClub(req: Request, res: Response) {
  try {
    const {club_id, recruitment, introduction, info_post_id, content} = req.body;
    let image_id = null;

    if (req.file) {
      const {path} = req.file as any;
      
      const image = await (await fetch(`http://localhost:3000/api/image`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({path})
      })).json();

      image_id = image.id;
    }

    await fetch(`http://localhost:3000/db/club`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: club_id, recruitment, introduction})
    });
    await fetch(`http://localhost:3000/db/post`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: info_post_id, content, image_id})
    });

    fetch(`http://localhost:3000/db/post/club?id=${club_id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      res
      .status(200)
      .json(data[0]);
    });
  } catch (err) {
    res
    .status(500)
    .json({message: err});
  }
}

// 유저 조회
async function getUser(req: Request, res: Response) {
  try {
    const params = new URLSearchParams(req.query as any).toString();
    
    fetch(`http://localhost:3000/db/user${params ? "?" + params : ""}`)
    .then(function (response) {
      return response.json();
    })
    .then(async function (data) {
      res
      .status(200)
      .json(await Promise.all(data.map(async function (user: {image_id: number}) {
        const image_url = (await (await fetch(`http://localhost:3000/api/image?id=${user.image_id}`)).json())[0];

        return {...user, image_url};
      })));
    });
  } catch (err) {
    res
    .status(500)
    .json({message: err});
  }
}

// 유저 로그인
async function login(req: Request, res: Response) {
  try {
    const {id, password} = req.body;
    const password_hash = crypto.createHash("sha512").update(password).digest("hex");
    const is_valid = (await (await fetch(`http://localhost:3000/db/user?id=${id}&password=${password_hash}`)).json()).length !== 0;
    
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

// 유저 업데이트
async function updateUser(req: Request, res: Response) {
  try {
    const {id, name, password, department, phone} = req.body;
    let image_id = null;

    if (req.file) {
      const {path} = req.file as any;
      
      const image = await (await fetch(`http://localhost:3000/api/image`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({path})
      })).json();

      image_id = image.id;
    }
        
    await fetch(`http://localhost:3000/db/user`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id, name, password, department, phone, image_id})
    });

    fetch(`http://localhost:3000/db/user?id=${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      res
      .status(200)
      .json(data[0]);
    });
  } catch (err) {
    console.error(err);
    res
    .status(500)
    .json({message: err});
  }
}

// 게시글 조회
async function getPost(req: Request, res: Response) {
  try {
    const params = new URLSearchParams(req.query as any).toString();
    
    fetch(`http://localhost:3000/db/post${params ? "?" + params : ""}`)
    .then(function (response) {
      return response.json();
    })
    .then(async function (data) {
      res
      .status(200)
      .json(await Promise.all(data.map(async function (post: {image_id: number}) {
        const image_url = (await (await fetch(`http://localhost:3000/api/image?id=${post.image_id}`)).json())[0];

        return {...post, image_url};
      })));
    });
  } catch (err) {
    res
    .status(500)
    .json({message: err});
  }
}

// 게시글 생성
async function createPost(req: Request, res: Response) {
  try {
    const {type, title, content, club_id} = req.body;
    let image_id = null;

    if (req.file) {
      const {path} = req.file as any;
      
      const image = await (await fetch(`http://localhost:3000/api/image`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({path})
      })).json();

      image_id = image.id;
    }
    
    fetch(`http://localhost:3000/db/post`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({type, title, content, club_id, image_id})
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

// 동아리 가입 신청 생성
async function createClubRequest(req: Request, res: Response) {
  try {
    const {club_id, user_id} = req.body;

    fetch(`http://localhost:3000/db/club_request?club_id=${club_id}&user_id=${user_id}&status=대기`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length !== 0) {
        res
        .status(409)
        .json(data);

        return;
      }

      fetch(`http://localhost:3000/db/club_request`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({club_id, user_id, status: "대기"})
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        res
        .status(201)
        .json(data);
      });
    });
  } catch (err) {
    res
    .status(500)
    .json({message: err});
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

export {
  getImageUrl,
  createImage,
  createClub,
  updateClub,
  getUser,
  login,
  updateUser,
  getPost,
  createPost,
  createClubRequest,
  updateClubRequest
};
