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
    type: String,
    required: true,
  },
  projectEndDate: {
    type: String,
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
    type: [Object],
    required: true,
  },
});

module.exports = mongoose.model("Projects", projectSchema);
