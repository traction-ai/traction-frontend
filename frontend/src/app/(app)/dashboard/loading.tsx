export default function DashboardLoading() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Title skeleton */}
      <div className="h-10 w-48 bg-gray-400/10 animate-pulse" />
      <div className="h-4 w-64 bg-gray-400/10 animate-pulse mt-3" />

      {/* Prompt input skeleton */}
      <div className="h-14 w-full bg-gray-400/10 animate-pulse mt-8" />

      {/* Grid skeleton */}
      <div className="mt-16">
        <div className="h-4 w-32 bg-gray-400/10 animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="border border-gray-100">
              <div className="aspect-video bg-gray-400/10 animate-pulse" />
              <div className="p-4">
                <div className="h-4 w-3/4 bg-gray-400/10 animate-pulse" />
                <div className="h-3 w-1/2 bg-gray-400/10 animate-pulse mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
