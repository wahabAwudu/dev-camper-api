const express = require("express");
const {
  getBootcamp,
  getBootcamps,
  filterBootcamps,
  deleteBootcamp,
  createBootcamp,
  updateBootcamp,
  getBootcampsByRadius,
} = require("./controllers");

const courseRouter = require("../courses/routes");

const router = express.Router();

// re-route into other router
router.use("/:id/courses", courseRouter);

// routes
router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route("/filter").post(filterBootcamps);

router.route("/radius/:zipcode/:distance").get(getBootcampsByRadius);

// router.get("/", (req, res) => {
//   const data = { bootcamps: [1, 2, 3] };
//   const success = true;
//   const message = "Show all bootcamps";
//   res.status(200).json(successResponse(data, message, success));
// });

module.exports = router;
