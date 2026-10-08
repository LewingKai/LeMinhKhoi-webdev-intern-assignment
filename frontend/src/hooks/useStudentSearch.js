import { useState } from "react";
import { api } from "@/lib/api";

export function useStudentSearch() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async (sbd) => {
    setLoading(true);
    setError("");

    try {
      const result = await api.getStudentBySbd(sbd);
      setStudent(result.data || null);
    } catch (err) {
      setStudent(null);
      setError(err.message || "Unable to fetch the student data.");
    } finally {
      setLoading(false);
    }
  };

  return {
    student,
    loading,
    error,
    search,
  };
}
