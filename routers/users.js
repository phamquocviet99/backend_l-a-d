import express from "express";
import {
  signIn,
  getAll,
  remove,
  login,
  changePassword,
  update
} from "../controllers/users.js";
// import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.post("/signIn", signIn);
router.get("/", getAll);
router.delete("/:id", remove);
router.post("/login", login);
router.put("/change", changePassword);
router.put("/:id", update);
export default router;
