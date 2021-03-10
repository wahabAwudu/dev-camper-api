const Course = require("./models");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const successResponse = require("../utils/successResponse");

// @desc Get all courses
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// @access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }
  let data = await query;
  res.status(200).json(successResponse(data, "Success", true));
});

// @desc Get one course
// @route GET /api/v1/courses/:id
// @access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  let data = await Course.findById(req.params.id);

  if (!data) {
    return next(new ErrorResponse("Resource not found", 400));
  }

  res.status(200).json(successResponse(data, "Success", true));
});

// @desc Create a course
// @route POST /api/v1/courses
// @access Public
exports.createCourse = asyncHandler(async (req, res, next) => {
  let _new = await Course.create(req.body);
  res.status(201).json(successResponse(_new, "success", true));
});

// @desc Update a courses
// @route PUT /api/v1/courses/:id
// @access Public
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(new ErrorResponse("Resource not found", 400));
  }

  res.status(200).json(successResponse(course, "success", true));
});

// @desc Delete a course
// @route DELETE /api/v1/courses/:id
// @access Public
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const data = await Course.findByIdAndDelete(req.params.id);

  if (!data) {
    return next(new ErrorResponse("Resource not found", 400));
  }

  res.status(200).json(successResponse(null, "success", true));
});
