import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { PageFallback } from "@/components/layout/PageFallback";

const SearchPage = lazy(() =>
  import("@/pages/SearchPage").then((module) => ({
    default: module.SearchPage,
  })),
);
const ReportPage = lazy(() =>
  import("@/pages/ReportPage").then((module) => ({
    default: module.ReportPage,
  })),
);
const TopGroupAPage = lazy(() =>
  import("@/pages/TopGroupAPage").then((module) => ({
    default: module.TopGroupAPage,
  })),
);

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/reports" element={<ReportPage />} />
            <Route path="/top-group-a" element={<TopGroupAPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
