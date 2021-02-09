const Bootcamp = require("../models/Bootcamps");

exports.createBootcamp = async (data) => {
  const bootcamp = await Bootcamp.create(data);
  return bootcamp;
};

exports.getAllBootcamps = async () => {
  const bootcamps = await Bootcamp.find({});
  return bootcamps;
};

exports.getBootcampById = async (_id) => {
  const bootcamp = await Bootcamp.findById(id).exec();
  return bootcamp;
};

exports.getOneBootcamp = async (param) => {
  const bootcamp = await Bootcamp.findOne(param).exec();
  return bootcamp;
};

exports.filterBootcamps = async (params) => {
  const bootcamps = await Bootcamp.find(params).exec();
  return bootcamps;
};

exports.updateBootcamp = async (_id, data) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
  });
  return bootcamp;
};

exports.deleteBootcamp = async (_id) => {
  const bootcamp = await Bootcamp.findOneAndDelete({ _id });
  return bootcamp;
};
