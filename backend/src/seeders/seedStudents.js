const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Student = require("../models/Student");

const SUBJECT_FIELDS = [
  "toan",
  "ngu_van",
  "ngoai_ngu",
  "vat_li",
  "hoa_hoc",
  "sinh_hoc",
  "lich_su",
  "dia_li",
  "gdcd",
];

const CSV_PATH = path.resolve(__dirname, "../../../diem_thi_thpt_2024.csv");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const normalizeScore = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const normalizeStudent = (row) => {
  const sbd = (row.sbd || "").toString().trim();

  if (!/^\d{8}$/.test(sbd)) {
    return { __invalid: true };
  }

  const student = {
    sbd,
    ma_ngoai_ngu: row.ma_ngoai_ngu
      ? row.ma_ngoai_ngu.toString().trim().toUpperCase()
      : null,
    source: "csv-thpt-2024",
  };

  SUBJECT_FIELDS.forEach((field) => {
    student[field] = normalizeScore(row[field]);
  });

  return student;
};

const seedStudents = async () => {
  const shouldReset = process.argv.includes("--reset");
  let skipped = 0;

  if (shouldReset) {
    await Student.deleteMany({});
    console.log(
      "Existing student collection cleared because --reset was provided.",
    );
  }

  const rows = [];
  let totalRows = 0;

  await new Promise((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(
        csv({
          mapHeaders: ({ header }) => header.trim(),
          mapValues: ({ value }) =>
            value === undefined ? "" : String(value).trim(),
        }),
      )
      .on("data", (row) => {
        totalRows += 1;
        const normalized = normalizeStudent(row);
        if (!normalized) {
          return;
        }

        if (normalized.__invalid) {
          skipped += 1;
          return;
        }

        rows.push(normalized);
      })
      .on("end", resolve)
      .on("error", reject);
  });

  if (rows.length === 0) {
    console.log("CSV seed completed.");
    console.log("Inserted: 0");
    console.log("Updated: 0");
    console.log(`Skipped invalid rows: ${skipped}`);
    console.log("Total processed: 0");
    return;
  }

  const chunkSize = 5000;
  let inserted = 0;
  let updated = 0;

  for (let index = 0; index < rows.length; index += chunkSize) {
    const chunk = rows.slice(index, index + chunkSize);
    const operations = chunk.map((student) => ({
      updateOne: {
        filter: { sbd: student.sbd },
        update: { $set: student },
        upsert: true,
      },
    }));

    const result = await Student.bulkWrite(operations, { ordered: false });
    inserted += result.upsertedCount || 0;
    updated += Math.min(result.matchedCount || 0, result.modifiedCount || 0);

    console.log(
      `Processed ${Math.min(index + chunk.length, rows.length)}/${rows.length} rows...`,
    );
  }

  console.log(`CSV seed completed.`);
  console.log(`Inserted: ${inserted}`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped invalid rows: ${skipped}`);
  console.log(`Total processed: ${rows.length}`);
  console.log(`Total read from CSV: ${totalRows}`);
};

const main = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is missing. Check backend/.env file.");
  }

  await mongoose.connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 15000,
    maxPoolSize: 10,
    minPoolSize: 1,
    retryWrites: true,
  });

  console.log("Connected to MongoDB for seeding.");

  try {
    await seedStudents();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

main();
