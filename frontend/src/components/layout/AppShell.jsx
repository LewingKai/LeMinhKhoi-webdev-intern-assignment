import { BarChart3, Search, Trophy } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Search", icon: Search },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/top-group-a", label: "Top Group A", icon: Trophy },
];

export function AppShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-6 md:px-8 md:pt-8">
        <header className="mb-6 rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur md:mb-8 md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/90">
                G-Scores 2024
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                Exam Insight Console
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                Search a candidate by registration number, compare score
                distributions by subject, and explore top Group A results in one
                clean workflow.
              </p>
            </div>
            <span className="inline-flex w-fit items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Academic year 2024
            </span>
          </div>

          <div className="mt-5 overflow-x-auto pb-1">
            <div className="flex min-w-max gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                        isActive
                          ? "border-primary/30 bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-background/70 text-foreground hover:border-primary/30 hover:bg-accent",
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
