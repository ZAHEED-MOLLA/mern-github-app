import express from "express";
import { exlporePopularRepos } from "../controllers/explore.controller.js";

const router = express.Router();
  

router.get("/repos/:language",exlporePopularRepos)

export default router;