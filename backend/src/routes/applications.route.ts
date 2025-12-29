import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { createApplicationByUserId, deleteApplicationByUserId, getAllApplicationsByUserId, updateApplicationByUserId } from "../controllers/application.controller";

const router = Router();

router.get("/", requireAuth(), getAllApplicationsByUserId)
router.post("/", requireAuth(), createApplicationByUserId);
router.patch("/:id", requireAuth(), updateApplicationByUserId);
router.delete("/:id", requireAuth(), deleteApplicationByUserId);

export default router;