import express from "express";
import { get, post, remove } from "../controllers/partner.js";

const router = express.Router();

router.get("/", get);

router.post("/", post);

router.delete("/:id", remove);

export default router;

//module.exports=router;
