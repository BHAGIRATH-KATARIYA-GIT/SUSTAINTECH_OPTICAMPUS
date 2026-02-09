import express from "express";
import { createEvent, getEventsByStudentId } from "../controllers/student.controller.js";

const router = express.Router();

router.post("/create-event", createEvent);
router.get("/get-events", getEventsByStudentId);

export default router;
