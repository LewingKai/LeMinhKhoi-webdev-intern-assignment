const { SUBJECTS, REPORT_LEVELS } = require("../constants/subjects");

class SubjectService {
  constructor(subjects = SUBJECTS, levels = REPORT_LEVELS) {
    this.subjects = subjects;
    this.levels = levels;
    this.subjectKeys = new Set(subjects.map((subject) => subject.key));
  }

  getSubjects() {
    return this.subjects;
  }

  getLevels() {
    return this.levels;
  }

  hasSubject(subjectKey) {
    return this.subjectKeys.has(subjectKey);
  }

  getSubjectOrNull(subjectKey) {
    return this.subjects.find((subject) => subject.key === subjectKey) || null;
  }
}

module.exports = SubjectService;
