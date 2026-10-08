const SUBJECTS = [
  { key: "toan", label: "Toán", group: "core" },
  { key: "ngu_van", label: "Ngữ văn", group: "core" },
  { key: "ngoai_ngu", label: "Ngoại ngữ", group: "core" },
  { key: "vat_li", label: "Vật lý", group: "groupA" },
  { key: "hoa_hoc", label: "Hóa học", group: "groupA" },
  { key: "sinh_hoc", label: "Sinh học", group: "groupA" },
  { key: "lich_su", label: "Lịch sử", group: "groupC" },
  { key: "dia_li", label: "Địa lý", group: "groupC" },
  { key: "gdcd", label: "GDCD", group: "groupC" },
];

const REPORT_LEVELS = [
  { key: "excellent", label: ">= 8", min: 8, max: Infinity },
  { key: "good", label: ">= 6 và < 8", min: 6, max: 8 },
  { key: "average", label: ">= 4 và < 6", min: 4, max: 6 },
  { key: "weak", label: "< 4", min: 0, max: 4 },
];

module.exports = {
  SUBJECTS,
  REPORT_LEVELS,
};
