import express from "express";
import { get, post, update, getById } from "../controllers/information.js";

const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.post("/", post);
router.put("/:id", update);

export default router;

//module.exports=router;
