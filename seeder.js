const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const Bootcamp = require("./bootcamps/models");
const Course = require("./courses/models");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// import into db
const importBootcamps = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("data imported");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const importCourses = async () => {
  try {
    await Course.create(courses);
    console.log("data imported");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const deleteBootcamps = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data destroyed");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const deleteCourses = async () => {
  try {
    await Course.deleteMany();
    console.log("Data destroyed");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-ib") {
  importBootcamps();
} else if (process.argv[2] === "-db") {
  deleteBootcamps();
} else if (process.argv[2] === "-ic") {
  importCourses();
} else if (process.argv[2] === "-dc") {
  deleteCourses();
}
