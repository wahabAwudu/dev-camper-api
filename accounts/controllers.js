const successResponse = require("../utils/successResponse");

// @desc login user
// @route POST /api/v1/auth/login
// @access Public
exports.loginUser = (req, res, next) => {
  const data = { user: "user 1" };
  const message = "Success";
  const success = true;
  res.status(200).json(successResponse(data, message, success));
};

// @desc Sign up user
// @route GET /api/v1/auth/signup
// @access Public
exports.registerUser = (req, res, next) => {
  const data = { user: "user 1" };
  const message = "Success";
  const success = true;
  res.status(200).json(successResponse(data, message, success));
};

exports.changePassword = (req, res, next) => {
  const data = null;
  const message = "Success";
  const success = true;
  res.status(200).json(successResponse(data, message, success));
};
