import {Router} from "express";

import {register} from "../controllers/register";

const register_router = Router();

register_router.post("/", register);

export default register_router;
