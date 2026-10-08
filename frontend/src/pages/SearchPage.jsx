import { useState } from "react";
import { Search } from "lucide-react";
import { useStudentSearch } from "@/hooks/useStudentSearch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const SCORE_KEYS = [
  ["toan", "Math"],
  ["ngu_van", "Literature"],
  ["ngoai_ngu", "Foreign Language"],
  ["vat_li", "Physics"],
  ["hoa_hoc", "Chemistry"],
  ["sinh_hoc", "Biology"],
  ["lich_su", "History"],
  ["dia_li", "Geography"],
  ["gdcd", "Civic Education"],
];

export function SearchPage() {
  const [sbd, setSbd] = useState("");
  const { student, loading, error, search } = useStudentSearch();

  const onSubmit = async (event) => {
    event.preventDefault();
    await search(sbd.trim());
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr,1fr] lg:items-start">
      <Card>
        <CardHeader>
          <CardTitle>Search exam results by registration number</CardTitle>
          <CardDescription>
            Enter an 8-digit registration number to view official subject scores
            and exam metadata.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Example: 01000003"
              value={sbd}
              onChange={(event) =>
                setSbd(event.target.value.replace(/\D/g, ""))
              }
              maxLength={8}
              aria-label="Registration number"
            />
            <Button type="submit" disabled={loading || sbd.trim().length !== 8}>
              <Search className="h-4 w-4" />
              {loading ? "Searching..." : "Search"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setSbd("")}>
              Clear
            </Button>
          </form>
          {error ? (
            <p className="mt-3 text-sm text-destructive">{error}</p>
          ) : null}
          {!student && !loading && !error ? (
            <div className="mt-4 rounded-xl border border-border/70 bg-muted/35 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Quick tip</p>
              <p className="mt-1">
                You can try sample IDs like 01000003 or 26020938 to preview a
                complete score profile.
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card className="order-first lg:order-0">
        <CardHeader>
          <CardTitle>Before you search</CardTitle>
          <CardDescription>
            Keep the registration number exactly 8 digits for accurate lookup.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Results include available subject scores, language code, and
            computed Group A total.
          </p>
          <p>
            Missing subjects are shown as{" "}
            <span className="font-medium">Not taken</span>, which usually means
            the candidate did not register for that exam.
          </p>
        </CardContent>
      </Card>

      {loading ? (
        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-6 w-56" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-background/40 p-4"
                >
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="mt-2 h-8 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {student ? (
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-3">
              <span>Result for SBD {student.sbd}</span>
              <Badge variant="secondary">{student.ma_ngoai_ngu || "N/A"}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SCORE_KEYS.map(([key, label]) => (
                <div
                  key={key}
                  className="rounded-xl border border-border/70 bg-muted/20 p-4 transition-colors duration-200 hover:border-primary/25 hover:bg-accent/40"
                >
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-1 text-2xl font-semibold">
                    {student[key] ?? (
                      <span className="text-base text-muted-foreground">
                        Not taken
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
