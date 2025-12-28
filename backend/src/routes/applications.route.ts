import { Router } from "express";
import { createApplicationByUserId, deleteApplicationByUserId, getAllApplicationsByUserId, updateApplicationByUserId } from "../controllers/application.controller";

const router = Router();

router.get("/", getAllApplicationsByUserId)
router.post("/", createApplicationByUserId);
router.patch("/:id", updateApplicationByUserId);
router.delete("/:id", deleteApplicationByUserId);

export default router;