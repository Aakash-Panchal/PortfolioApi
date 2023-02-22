const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  projectCategory: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectStartDate: {
    type: Date,
    required: true,
  },
  projectEndDate: {
    type: Date,
    required: true,
  },
  projectReview: {
    type: String,
  },
  projectLink: {
    type: String,
    required: true,
  },
  ProjectImages: {
    required: true,
    type: [Object],
  },
  url: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Projects", projectSchema);
