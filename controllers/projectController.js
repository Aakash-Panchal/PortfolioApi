const Projects = require("../models/projectModel");

const AddProject = async (req, res) => {
  try {
    //Get Project Title from body
    const { projectTitle } = req.body;

    //Check if project already exist
    const checkProject = await Projects.findOne({ projectTitle });
    if (checkProject)
      return res.json({ Error: "Project already exist", status: false });

    //Get Project Details from body
    const projects = new Projects({
      projectTitle: req.body.projectTitle,
      projectDescription: req.body.projectDescription,
      projectReview: req.body.projectReview,
      projectLink: req.body.projectLink,
      ProjectMainImage: req.body.ProjectMainImage,
      ProjectImages: req.body.ProjectImages,
    });

    //Send Project Details in Database
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
