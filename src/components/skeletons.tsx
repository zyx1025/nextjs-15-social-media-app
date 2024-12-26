export function Skeleton({ height }: { height?: string }) {
  return (
    <div
      className="bg-gray-200 animate-pulse rounded-md"
      style={{ height: height || "200px", width: "100%" }}
    >
      loading...
    </div>
  );
}
