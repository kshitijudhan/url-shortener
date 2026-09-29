import { Router } from "express";
import { redirecturl } from "../controllers/url.controller.js";

const router = Router();

router.get("/:shortCode", redirecturl);

export default router;
