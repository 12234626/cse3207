import {Router} from "express";

import {my, edit, clubrequest, club, create} from "../controllers/my";

const my_router = Router();

my_router.get("/", my);
my_router.post("/edit", edit);
my_router.get("/clubrequest", clubrequest);
my_router.get("/club", club);
my_router.post("/create", create);

export default my_router;
