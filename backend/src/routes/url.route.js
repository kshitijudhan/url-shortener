import { Router } from "express";
import { saveUrl } from "../controllers/url.controller.js";

const router = Router();

router.post("/", saveUrl);

export default router;
