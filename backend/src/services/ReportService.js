class ReportService {
  constructor(studentModel, subjectService) {
    this.Student = studentModel;
    this.subjectService = subjectService;
  }

  async getScoreLevelStats(subjectKey) {
    const subject = this.subjectService.getSubjectOrNull(subjectKey);

    if (!subject) {
      return null;
    }

    const [totalStudents, takenCount, bucketRows] = await Promise.all([
      this.Student.estimatedDocumentCount(),
      this.Student.countDocuments({ [subject.key]: { $ne: null } }),
      this.Student.aggregate([
        {
          $match: {
            [subject.key]: { $ne: null },
          },
        },
        {
          $bucket: {
            groupBy: `$${subject.key}`,
            boundaries: [0, 4, 6, 8, 11],
            default: "out_of_range",
            output: {
              count: { $sum: 1 },
            },
          },
        },
      ]),
    ]);

    const mapByBoundary = Object.fromEntries(
      bucketRows
        .filter((row) => typeof row._id === "number")
        .map((row) => [row._id, row.count]),
    );

    const levels = {
      excellent: mapByBoundary[8] || 0,
      good: mapByBoundary[6] || 0,
      average: mapByBoundary[4] || 0,
      weak: mapByBoundary[0] || 0,
    };

    return {
      subject: {
        key: subject.key,
        label: subject.label,
      },
      levels,
      takenCount,
      notTakenCount: Math.max(totalStudents - takenCount, 0),
    };
  }

  async getScoreLevelStatsBySubject(subjectKey) {
    if (subjectKey) {
      const single = await this.getScoreLevelStats(subjectKey);
      return single ? [single] : [];
    }

    const subjects = this.subjectService.getSubjects();
    const results = [];

    for (const subject of subjects) {
      const item = await this.getScoreLevelStats(subject.key);
      if (item) {
        results.push(item);
      }
    }

    return results;
  }

  async getTopGroupA(limit = 10) {
    const safeLimit = Math.max(1, Math.min(100, Number(limit) || 10));

    return this.Student.aggregate([
      {
        $match: {
          toan: { $ne: null },
          vat_li: { $ne: null },
          hoa_hoc: { $ne: null },
        },
      },
      {
        $addFields: {
          groupA_total: {
            $add: ["$toan", "$vat_li", "$hoa_hoc"],
          },
        },
      },
      {
        $sort: {
          groupA_total: -1,
          toan: -1,
          vat_li: -1,
          hoa_hoc: -1,
          sbd: 1,
        },
      },
      {
        $limit: safeLimit,
      },
      {
        $project: {
          _id: 0,
          sbd: 1,
          toan: 1,
          vat_li: 1,
          hoa_hoc: 1,
          groupA_total: 1,
        },
      },
    ]);
  }
}

module.exports = ReportService;
