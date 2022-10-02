const express = require("express");
const {
  AddProject,
  EditProject,
  DeleteProject,
  GetAllProjects,
  GetSingleProjects,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", AddProject);
router.get("/", GetAllProjects);
router.get("/:id", GetSingleProjects);
router.patch("/:id", EditProject);
router.delete("/:id", DeleteProject);

module.exports = router;
