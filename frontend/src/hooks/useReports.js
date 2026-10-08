import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useScoreLevels(initialSubject = "") {
  const [subject, setSubject] = useState(initialSubject);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLevels = useCallback(
    async (nextSubject = subject) => {
      setLoading(true);
      setError("");

      try {
        const result = await api.getReportLevels(nextSubject);
        setData(result.data || []);
      } catch (err) {
        setData([]);
        setError(err.message || "Unable to load the report data.");
      } finally {
        setLoading(false);
      }
    },
    [subject],
  );

  useEffect(() => {
    fetchLevels(subject);
  }, [subject, fetchLevels]);

  return {
    subject,
    setSubject,
    data,
    loading,
    error,
    refetch: fetchLevels,
  };
}

export function useTopGroupA(initialLimit = 10) {
  const [limit, setLimit] = useState(initialLimit);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTop = useCallback(
    async (nextLimit = limit) => {
      setLoading(true);
      setError("");

      try {
        const result = await api.getTopGroupA(nextLimit);
        setData(result.data || []);
      } catch (err) {
        setData([]);
        setError(err.message || "Unable to load the Top Group A data.");
      } finally {
        setLoading(false);
      }
    },
    [limit],
  );

  useEffect(() => {
    fetchTop(limit);
  }, [limit, fetchTop]);

  return {
    limit,
    setLimit,
    data,
    loading,
    error,
    refetch: fetchTop,
  };
}
