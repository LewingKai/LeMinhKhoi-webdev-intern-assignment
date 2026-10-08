class StudentService {
  constructor(studentModel) {
    this.Student = studentModel;
  }

  async findBySbd(sbd) {
    return this.Student.findOne({ sbd }).lean({ virtuals: true });
  }
}

module.exports = StudentService;
