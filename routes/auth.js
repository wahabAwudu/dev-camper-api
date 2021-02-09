const express = require("express");
const {
  loginUser,
  registerUser,
  changePassword,
} = require("../controllers/auth");
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);
router.route("/password-change").post(changePassword);

module.exports = router;
