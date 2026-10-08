const Student = require("../models/Student");
const SubjectService = require("../services/SubjectService");
const ReportService = require("../services/ReportService");

const subjectService = new SubjectService();
const reportService = new ReportService(Student, subjectService);

const getScoreLevelReport = async (req, res, next) => {
  try {
    const stats = await reportService.getScoreLevelStatsBySubject(
      req.query.subject,
    );

    return res.json({
      message: "Report data retrieved successfully.",
      data: stats,
    });
  } catch (error) {
    return next(error);
  }
};

const getTopGroupAReport = async (req, res, next) => {
  try {
    const students = await reportService.getTopGroupA(req.query.limit || 10);

    return res.json({
      message: "Top Group A candidates retrieved successfully.",
      data: students,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getScoreLevelReport,
  getTopGroupAReport,
};
