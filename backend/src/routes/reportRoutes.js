const express = require("express");

const {
  getScoreLevelReport,
  getTopGroupAReport,
} = require("../controllers/reportController");
const {
  validateReportQuery,
  validateTopGroupAQuery,
} = require("../middlewares/validators");

const router = express.Router();

router.get("/levels", validateReportQuery, getScoreLevelReport);
router.get("/top-group-a", validateTopGroupAQuery, getTopGroupAReport);

module.exports = router;
