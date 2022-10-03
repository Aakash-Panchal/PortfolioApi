const express = require("express");
const {
  AddProject,
  EditProject,
  DeleteProject,
  GetAllProjects,
  GetSingleProjects,
} = require("../controllers/projectController");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();

router.post("/", verifyAdmin, AddProject);
router.get("/", verifyAdmin, GetAllProjects);
router.get("/:id", GetSingleProjects);
router.patch("/:id", verifyAdmin, EditProject);
router.delete("/:id", verifyAdmin, DeleteProject);

module.exports = router;
