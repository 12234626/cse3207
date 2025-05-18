import {Router} from "express";

import {login} from "../controllers/login";

const login_router = Router();

login_router.post("/", login);

export default login_router;
