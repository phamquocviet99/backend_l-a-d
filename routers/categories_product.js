import express from "express";
import {
  get,
  getById,
  post,
  update,
  remove,
  getfor
} from "../controllers/categories_product.js";

const router = express.Router();

router.get("/", get);
router.get("/for", getfor);
router.get("/:id", getById);
router.post("/", post);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;

//module.exports=router;
