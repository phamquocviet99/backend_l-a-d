import express from "express";
import { get, post, remove } from "../controllers/message_customer.js";

const router = express.Router();

router.get("/", get);
router.delete("/:id", remove);
router.post("/", post);

export default router;

//module.exports=router;
