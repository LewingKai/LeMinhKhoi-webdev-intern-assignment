const Student = require("../models/Student");
const StudentService = require("../services/StudentService");

const studentService = new StudentService(Student);

const getStudentBySbd = async (req, res, next) => {
  try {
    const student = await studentService.findBySbd(req.params.sbd);

    if (!student) {
      return res.status(404).json({
        message: `No student found with registration number ${req.params.sbd}.`,
      });
    }

    return res.json({
      message: "Student data retrieved successfully.",
      data: student,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getStudentBySbd,
};
