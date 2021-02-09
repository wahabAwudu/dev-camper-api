const Bootcamp = require("../models/Bootcamps");
const ErrorResponse = require("../utils/errorResponse");
const successResponse = require("../utils/successResponse");

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const data = await Bootcamp.find();
    const success = true;
    const message = "Success";
    res.status(200).json(successResponse(data, message, success));
  } catch (err) {
    next(err);
  }
};

// @desc Get one bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamp.findById(req.params.id);
    const success = true;
    const message = "Success";

    if (!data) {
      return next(new ErrorResponse("Resource not found", 400));
    }

    res.status(200).json(successResponse(data, message, success));
  } catch (err) {
    next(err);
  }
};

// @desc Filter through bootcamps
// @route POST /api/v1/bootcamps/filter
// @acces Public
exports.filterBootcamps = async (req, res, next) => {
  try {
    const data = await Bootcamp.find(req.body);
    const success = true;
    const message = "Success";
    res.status(200).json(successResponse(data, message, success));
  } catch (err) {
    next(err);
  }
};

// @desc Create a bootcamp
// @route POST /api/v1/bootcamps
// @access Public
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    const success = true;
    const message = "Success";
    const data = bootcamp;

    res.status(201).json(successResponse(data, message, success));
  } catch (err) {
    next(err);
  }
};

// @desc Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Public
exports.updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

// @desc Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Public
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamp.findByIdAndDelete(req.params.id);
    const success = true;
    const message = "Success";

    if (!data) {
      return next(new ErrorResponse("Resource not found", 400));
    }

    res.status(200).json(successResponse(null, message, success));
  } catch (err) {
    next(err);
  }
};
