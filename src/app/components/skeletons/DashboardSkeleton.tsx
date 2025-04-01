// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function StatCardsSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <div className="grid grid-cols-5 gap-6">
        {[...Array(5)].map((item, i) => (
          <div 
            key={i} 
            className={`border-r border-dashed border-input-gray pr-6 ${i === 4 ? 'border-r-0' : ''}`}
          >
            <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-3/4 mb-4 ${shimmer}`}></div>
            <div className={`relative overflow-hidden h-8 bg-gray-200 rounded w-1/2 mb-4 ${shimmer}`}></div>
            <div className={`relative overflow-hidden h-3 bg-gray-200 rounded w-full ${shimmer}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return(
    <div className="bg-white p-4 rounded-lg shadow-h-64">
      <div className="flex justify-between items-center mb-4">
        <div className={`h-6 bg-gray-200 rounded w-1/4 ${shimmer}`}></div>
        <div className="h-6 bg-gray-100 rounded-lg p-1">
          {[...Array(3)].map((item, i) => (
            <div key={i} className={`px-4 py-1 bg-gray-200 rounded-lg mx-1 ${shimmer}`}></div>
          ))}
        </div>             
      </div>
      <div className={`h-48 bg-gray-100 rounded ${shimmer}`}></div>
    </div>
  );
}

export function ActionsSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="space-y-4">
        {[...Array(10)].map((item, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SidebarSkeleton() {
  return (
    <div className="flex flex-col w-64 h-screen bg-white shadow-lg">
      {/* Logo Skeleton */}
      <div className="flex items-center justify-center h-20 pt-10">
        <div className={`w-[150px] h-[150px] bg-gray-200 rounded animate-pulse ${shimmer}`}></div>
      </div>
      
      {/* Menu Items Skeleton */}
      <nav className="flex-1 px-4 py-15 space-y-2">
        {[...Array(5)].map((item, i) => (
          <div key={i} className="flex items-center p-2 rounded-lg">
            <div className={`w-5 h-5 mr-3 bg-gray-200 rounded-full animate-pulse ${shimmer}`}></div>
            <div className={`h-4 bg-gray-200 rounded animate-pulse ${shimmer}`}></div>
          </div>
        ))}
      </nav>
    </div>
  )
}