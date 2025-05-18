import {Router} from "express";

import {create, post, info, page, admin, member, request, write} from "../controllers/club";

const club_router = Router();

club_router.get("/create", create);
club_router.get("/post/:post_id", post);
club_router.get("/:club_id/info", info);
club_router.get("/:club_id/page", page);
club_router.get("/:club_id/admin", admin);
club_router.get("/:club_id/member", member);
club_router.get("/:club_id/request", request);
club_router.get("/:club_id/write", write);

export default club_router;
