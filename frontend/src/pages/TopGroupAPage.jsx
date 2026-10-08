import { useTopGroupA } from "@/hooks/useReports";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TopGroupAPage() {
  const { limit, setLimit, data, loading, error, refetch } = useTopGroupA(10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Group A candidates</CardTitle>
        <CardDescription>
          Ranked by total Math + Physics + Chemistry scores with tie-break by
          subject scores.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label
            htmlFor="limit-select"
            className="text-sm text-muted-foreground"
          >
            Count
          </label>
          <select
            id="limit-select"
            className="h-10 rounded-xl border border-border bg-card px-3 text-sm text-foreground shadow-sm transition-colors hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring"
            value={limit}
            onChange={(event) => setLimit(Number(event.target.value))}
          >
            {[5, 10, 20, 50].map((option) => (
              <option key={option} value={option}>
                Top {option}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            className="sm:ml-auto"
            onClick={() => refetch(limit)}
          >
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}
          </div>
        ) : null}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {!loading && !error && data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No Group A data is available for display.
          </p>
        ) : null}

        {!loading && !error && data.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>SBD</TableHead>
                <TableHead>Math</TableHead>
                <TableHead>Physics</TableHead>
                <TableHead>Chemistry</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.sbd}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.sbd}</TableCell>
                  <TableCell>{item.toan}</TableCell>
                  <TableCell>{item.vat_li}</TableCell>
                  <TableCell>{item.hoa_hoc}</TableCell>
                  <TableCell className="font-semibold">
                    {item.groupA_total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}
      </CardContent>
    </Card>
  );
}
