import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function SubjectScoreChart({ data }) {
  return (
    <div className="h-88 w-full sm:h-96 lg:h-104">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 12, right: 12, left: -20, bottom: 12 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="subject"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
            }}
          />
          <Legend />
          <Bar
            dataKey="weak"
            name="< 4"
            stackId="a"
            fill="hsl(var(--chart-5))"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="average"
            name=">= 4 & < 6"
            stackId="a"
            fill="hsl(var(--chart-4))"
          />
          <Bar
            dataKey="good"
            name=">= 6 & < 8"
            stackId="a"
            fill="hsl(var(--chart-2))"
          />
          <Bar
            dataKey="excellent"
            name=">= 8"
            stackId="a"
            fill="hsl(var(--chart-1))"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
