const mongoose = require("mongoose");

const scoreField = {
  type: Number,
  min: 0,
  max: 10,
  default: null,
  set: (value) => {
    if (value === "" || value === null || value === undefined) {
      return null;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  },
};

const studentSchema = new mongoose.Schema(
  {
    sbd: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^\d{8}$/, "Registration number must contain exactly 8 digits"],
    },
    toan: scoreField,
    ngu_van: scoreField,
    ngoai_ngu: scoreField,
    vat_li: scoreField,
    hoa_hoc: scoreField,
    sinh_hoc: scoreField,
    lich_su: scoreField,
    dia_li: scoreField,
    gdcd: scoreField,
    ma_ngoai_ngu: {
      type: String,
      trim: true,
      uppercase: true,
      default: null,
    },
    source: {
      type: String,
      default: "csv-thpt-2024",
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

studentSchema.virtual("groupA_total").get(function () {
  const values = [this.toan, this.vat_li, this.hoa_hoc].filter(
    (value) => value !== null && value !== undefined,
  );
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0);
});

studentSchema.index({ toan: 1, vat_li: 1, hoa_hoc: 1 });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
