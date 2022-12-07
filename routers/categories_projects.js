import express from "express";
import {
  get,
  getById,
  post,
  update,
  remove,
} from "../controllers/categories_projects.js";

const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.post("/", post);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;

//module.exports=router;
