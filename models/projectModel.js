const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectReview: {
    type: String,
    required: true,
  },
  projectLink: {
    type: String,
    required: true,
  },
  ProjectMainImage: {
    type: String,
    required: true,
  },
  ProjectImages: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Projects", projectSchema);
