import { Router } from "express";

const router = Router();

import {
  getUsers,
  createUser,
  deleteUser,
} from "../controllers/users.controller.js";

router.get("/", getUsers);          
router.post("/", createUser);       
router.delete("/:id", deleteUser);  


export default router;
