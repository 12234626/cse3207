import {Router} from "express";

import {club, page} from "../controllers/main";

const main_router = Router();

main_router.get("/club", club);
main_router.get("/page", page);

export default main_router;
