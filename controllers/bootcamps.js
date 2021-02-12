const Bootcamp = require("../models/Bootcamps");
const ErrorResponse = require("../utils/errorResponse");
const successResponse = require("../utils/successResponse");
const asyncHandler = require("../middlewares/async");

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const data = await Bootcamp.find();
  const success = true;
  const message = "Success";
  res.status(200).json(successResponse(data, message, success));
});

// @desc Get one bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamp.findById(req.params.id);
  const success = true;
  const message = "Success";

  if (!data) {
    return next(new ErrorResponse("Resource not found", 400));
  }

  res.status(200).json(successResponse(data, message, success));
});

// @desc Filter through bootcamps
// @route POST /api/v1/bootcamps/filter
// @acces Public
exports.filterBootcamps = asyncHandler(async (req, res, next) => {
  const data = await Bootcamp.find(req.body);
  const success = true;
  const message = "Success";
  res.status(200).json(successResponse(data, message, success));
});

// @desc Create a bootcamp
// @route POST /api/v1/bootcamps
// @access Public
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  const success = true;
  const message = "Success";
  const data = bootcamp;

  res.status(201).json(successResponse(data, message, success));
});

// @desc Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Public
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const success = true;
  const message = "Success";
  const data = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!data) {
    return next(new ErrorResponse("Resource not found", 400));
  }
  res.status(200).json(successResponse(data, message, success));
});

// @desc Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamp.findByIdAndDelete(req.params.id);
  const success = true;
  const message = "Success";

  if (!data) {
    return next(new ErrorResponse("Resource not found", 400));
  }

  res.status(200).json(successResponse(null, message, success));
});
