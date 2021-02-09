const { successResponse, errorResponse } = require("./utils");
const {
  createBootcamp,
  getAllBootcamps,
  getBootcampById,
  filterBootcamps,
  getOneBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../Selectors/Bootcamps");

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = async (req, res, next) => {
  const data = await getAllBootcamps();
  const success = true;
  const message = "Success";
  res.status(200).json(successResponse(data, message, success));
};

// @desc Get one bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = async (req, res, next) => {
  const data = await getBootcampById(req.params.id);
  const success = true;
  const message = "Success";
  res.status(200).json(successResponse(data, message, success));
};

// @desc Filter through bootcamps
// @route POST /api/v1/bootcamps/filter
// @acces Public
exports.filterBootcamps = async (req, res, next) => {
  const data = await filterBootcamps(req.body);
  const success = true;
  const message = "Success";
  res.status(200).json(successResponse(data, message, success));
};

// @desc Create a bootcamp
// @route POST /api/v1/bootcamps
// @access Public
exports.createBootcamp = async (req, res, next) => {
  const bootcamp = await createBootcamp(req.body);
  const success = true;
  const message = "Success";
  const data = bootcamp;

  res.status(201).json(successResponse(data, message, success));
};

// @desc Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Public
exports.updateBootcamp = async (req, res, next) => {
  const success = true;
  const message = "Success";
  const data = await updateBootcamp(req.params.id, req.body);
  if (!data) {
    res.status(400).json(successResponse(null, { detail: "Not Found" }, false));
  }
  res.status(200).json(successResponse(data, message, success));
};

// @desc Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Public
exports.deleteBootcamp = async (req, res, next) => {
  await deleteBootcamp(req.params.id);
  const success = true;
  const message = "Success";
  res.status(200).json(successResponse(null, message, success));
};
