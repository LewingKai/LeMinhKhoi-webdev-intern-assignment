import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-linear-to-r from-muted/80 via-muted/40 to-muted/80",
        className,
      )}
      {...props}
    />
  );
}
