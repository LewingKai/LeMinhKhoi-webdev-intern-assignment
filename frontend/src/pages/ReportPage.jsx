import { Suspense, lazy } from "react";
import { useScoreLevels } from "@/hooks/useReports";
import { SUBJECT_OPTIONS } from "@/lib/subjects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const SubjectScoreChart = lazy(() =>
  import("@/components/charts/SubjectScoreChart").then((module) => ({
    default: module.SubjectScoreChart,
  })),
);

function normalizeChartData(items) {
  return items.map((item) => ({
    subject: item.subject.label,
    weak: item.levels.weak,
    average: item.levels.average,
    good: item.levels.good,
    excellent: item.levels.excellent,
    taken: item.takenCount,
    notTaken: item.notTakenCount,
  }));
}

export function ReportPage() {
  const { subject, setSubject, data, loading, error, refetch } =
    useScoreLevels("");
  const chartData = normalizeChartData(data);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Score distribution report by subject</CardTitle>
          <CardDescription>
            Track how each subject is distributed across four bands: {"< 4"},{" "}
            {">= 4 & < 6"}, {">= 6 & < 8"}, and {">= 8"}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label
              htmlFor="subject-filter"
              className="text-sm text-muted-foreground"
            >
              Subject
            </label>
            <select
              id="subject-filter"
              className="h-10 rounded-xl border border-border bg-card px-3 text-sm text-foreground shadow-sm transition-colors hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              <option value="">All subjects</option>
              {SUBJECT_OPTIONS.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              className="sm:ml-auto"
              onClick={() => refetch(subject)}
            >
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-88 w-full sm:h-96 lg:h-104" />
            </div>
          ) : null}
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {!loading && !error && chartData.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No data is available for the selected subject. Try another filter.
            </p>
          ) : null}

          {!loading && !error && chartData.length > 0 ? (
            <Suspense
              fallback={<Skeleton className="h-88 w-full sm:h-96 lg:h-104" />}
            >
              <SubjectScoreChart data={chartData} />
            </Suspense>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
