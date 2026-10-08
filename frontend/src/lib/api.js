const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let payload = null;

  try {
    payload = await response.json();
  } catch (_error) {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(payload?.message || "Request failed");
  }

  return payload;
}

export const api = {
  getStudentBySbd: (sbd) => request(`/api/students/${sbd}`),
  getReportLevels: (subject = "") =>
    request(
      subject
        ? `/api/reports/levels?subject=${subject}`
        : "/api/reports/levels",
    ),
  getTopGroupA: (limit = 10) =>
    request(`/api/reports/top-group-a?limit=${limit}`),
};
