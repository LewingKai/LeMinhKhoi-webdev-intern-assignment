const express = require("express");

const { getStudentBySbd } = require("../controllers/studentController");
const { validateSbdParam } = require("../middlewares/validators");

const router = express.Router();

router.get("/:sbd", validateSbdParam, getStudentBySbd);

module.exports = router;
