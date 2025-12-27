import { Router } from "express";
import { createApplicationByUserId, deleteApplicationByUserId, getAllApplicationsByUserId } from "../controllers/application.controller";

const router = Router();

router.get("/", getAllApplicationsByUserId)
router.post("/", createApplicationByUserId);
router.delete("/:id", deleteApplicationByUserId);

export default router;