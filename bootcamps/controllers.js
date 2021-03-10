const Bootcamp = require("./models");
const ErrorResponse = require("../utils/errorResponse");
const successResponse = require("../utils/successResponse");
const asyncHandler = require("../middlewares/async");
const geocoder = require("../utils/geocoder");

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  // NB: select fields is expected to come as field,field,field but set in url as select=[field,field,field]
  // special filter fields are expected to come as {field : {gte: value}} but set in url as field[gte]=value
  let reqQuery = { ...req.query };

  // remove 'select' and 'sort' from query param. we wanna use it specially for sorting or selecting.
  let removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);

  // Turn query into string so we can manipulate the query params.
  let queryStr = JSON.stringify(req.query);
  // append $ operator to (gte, gt, etc) for mongo to use for filtering. becomes ($gte, $gt, etc).
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  let queryset = Bootcamp.find(JSON.parse(queryStr));

  // remove commas in select params array and replace with space. and use it to select fields. graphql style. Lol
  if (req.query.select) {
    let selectFields = req.query.select.split(",").join(" ");
    queryset = queryset.select(selectFields);
  }

  // remove commas in sort.
  if (req.query.sort) {
    let sortBy = req.query.sort.split(",").join(" ");
    queryset = queryset.sort(sortBy);
  } else {
    queryset = queryset.sort("-createdAt");
  }

  // pagination
  // current page
  const page = parseInt(req.query.page, 10) || 1;
  // load of data on each page
  const limit = parseInt(req.query.limit, 10) || 100;
  // the number of data to skip by. so we get the next set of data.
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const count = await Bootcamp.countDocuments();

  queryset = queryset.skip(startIndex).limit(limit);

  // pagination format
  const pagination = {};

  if (endIndex < count) {
    pagination.next = { page: page + 1, limit };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  const data = await queryset;
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

// @desc Get Bootcamps with a radius and distance
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
exports.getBootcampsByRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  const radius = distance / 3963;

  const data = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  const success = true;
  const message = "Success";

  res.status(200).json(successResponse(data, message, success));
});
