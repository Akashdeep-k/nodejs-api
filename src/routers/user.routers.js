const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
  = require("../controllers/users.controllers");

const auth = require("../middlewares/auth.middlewares");

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.put("/:userId", auth, updateUser);
router.delete("/:userId", auth, deleteUser);

module.exports = router;