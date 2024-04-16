import express from "express";
import { exlporePopularRepos } from "../controllers/explore.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();
  

router.get("/repos/:language",ensureAuthenticated,exlporePopularRepos)

export default router;