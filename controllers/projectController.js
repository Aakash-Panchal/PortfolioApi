const Projects = require("../models/projectModel");
const cloudninary = require("../middleware/cloudinary");
const fs = require("fs");

const AddProject = async (req, res) => {
  try {
    //Get Project Title from body
    const { projectTitle } = req.body;

    //Check if project already exist
    const checkProject = await Projects.findOne({ projectTitle });
    if (checkProject)
      return res.json({ Error: "Project already exist", status: false });

    //Upload PRoject Images
    const uploader = async (path) =>
      await cloudninary.uploads(path, "Project Images");

    let ProjectImages = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const filePath = await uploader(path);
      ProjectImages.push(filePath);
      fs.unlinkSync(path);
    }

    // Get Project Details from body
    const projects = new Projects({
      projectTitle: req.body.projectTitle,
      projectCategory: req.body.projectCategory,
      projectDescription: req.body.projectDescription,
      projectStartDate: req.body.projectStartDate,
      projectEndDate: req.body.projectEndDate,
      projectReview: req.body.projectReview,
      projectLink: req.body.projectLink,
      ProjectImages: ProjectImages,
    });

    // Send Project Details in Database
    await projects.save();
    res.status(201).send("Project Added");
  } catch (error) {
    res.status(500).send(error);
  }
};

const GetAllProjects = async (req, res) => {
  try {
    //Get all projects from database
    const project = await Projects.find();
    res.status(200).send(project);
  } catch (error) {
    res.send(error);
  }
};

const GetSingleProjects = async (req, res) => {
  try {
    //Get Single project from database
    const id = req.params.id;
    const singleProject = await Projects.findById(id);

    res.status(200).send(singleProject);
  } catch (error) {
    res.send(error);
  }
};

const EditProject = async (req, res) => {
  try {
    //Edit Project by id
    const id = req.params.id;
    const editProject = await Projects.findByIdAndUpdate(id);

    res.status(200).send("Project Edited");
  } catch (error) {
    res.send("Error While Editing Project");
  }
};

const DeleteProject = async (req, res) => {
  try {
    //Delete Project by id
    const id = req.params.id;
    const project = await Projects.findByIdAndDelete(id);

    res.send(`${project.projectTitle} has been deleted.`);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  AddProject,
  GetAllProjects,
  GetSingleProjects,
  EditProject,
  DeleteProject,
};
