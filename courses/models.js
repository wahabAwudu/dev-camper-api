const mongoose = require("mongoose");
const slugify = require("slugify");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
    trim: true,
    maxlength: [50, "Title cannot be more than 50"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: [250, "Description cannot be more than 250"],
  },
  weeks: {
    type: String,
    required: [true, "Weeks is required"],
  },
  tuition: {
    type: Number,
    required: [true, "Tuition is required"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Minimum Skill is required"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipsAvailable: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

CourseSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Course", CourseSchema);
