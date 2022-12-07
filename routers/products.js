import express from "express";
import {
  get,
  getById,
  post,
  update,
  remove,getByIdCategory,
  search
} from "../controllers/products.js";

const router = express.Router();

router.get("/", get);
router.post("/search", search);
router.get("/:id", getById);
router.get("/idcate/:id", getByIdCategory);
router.post("/", post);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;

//module.exports=router;