const { SUBJECTS } = require("../constants/subjects");

const subjectKeys = new Set(SUBJECTS.map((subject) => subject.key));

const validateSbdParam = (req, res, next) => {
  const sbd = String(req.params.sbd || "").trim();

  if (!/^\d{8}$/.test(sbd)) {
    return res.status(400).json({
      message:
        "Invalid registration number. SBD must contain exactly 8 digits.",
    });
  }

  req.params.sbd = sbd;
  return next();
};

const validateReportQuery = (req, res, next) => {
  const { subject } = req.query;

  if (subject && !subjectKeys.has(subject)) {
    return res.status(400).json({
      message: "Invalid subject.",
      validSubjects: Array.from(subjectKeys),
    });
  }

  return next();
};

const validateTopGroupAQuery = (req, res, next) => {
  const { limit } = req.query;

  if (limit === undefined) {
    return next();
  }

  const parsed = Number(limit);

  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 100) {
    return res.status(400).json({
      message: "limit must be an integer between 1 and 100.",
    });
  }

  req.query.limit = parsed;
  return next();
};

module.exports = {
  validateSbdParam,
  validateReportQuery,
  validateTopGroupAQuery,
};
