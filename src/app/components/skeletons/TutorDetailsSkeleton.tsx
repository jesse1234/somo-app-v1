// components/skeletons/TutorDetailsSkeleton.tsx
const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

// Stat Cards Skeleton
export function TutorStatsSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow">
          <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-3/4 mb-4 ${shimmer}`}></div>
          <div className={`relative overflow-hidden h-8 bg-gray-200 rounded w-1/2 ${shimmer}`}></div>
        </div>
      ))}
    </div>
  );
}

// Tutor Profile Skeleton
export function TutorProfileSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-fit">
      <div className="flex flex-col items-center">
        {/* Profile Header */}
        <div className="flex justify-between w-full mb-4">
          <div className={`relative overflow-hidden h-6 bg-gray-200 rounded w-1/4 ${shimmer}`}></div>
          <div className={`relative overflow-hidden w-6 h-6 bg-gray-200 rounded ${shimmer}`}></div>
        </div>
        
        {/* Profile Picture */}
        <div className={`relative w-32 h-32 rounded-full bg-gray-200 mb-6 ${shimmer}`}></div>
        
        {/* Name */}
        <div className={`relative overflow-hidden h-6 bg-gray-200 rounded w-3/4 mb-6 ${shimmer}`}></div>
        
        {/* Profile Completion */}
        <div className="w-full mb-4">
          <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-1/2 mb-2 ${shimmer}`}></div>
          <div className="flex items-center gap-3">
            <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-8 ${shimmer}`}></div>
            <div className={`relative overflow-hidden flex-1 bg-gray-200 rounded-full h-2.5 ${shimmer}`}></div>
          </div>
        </div>
        
        {/* Profile Details */}
        <div className="w-full space-y-3">
          {[...Array(7)].map((_, i) => (
            <div key={i}>
              <div className={`relative overflow-hidden h-3 bg-gray-200 rounded w-1/3 mb-1 ${shimmer}`}></div>
              <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-full ${shimmer}`}></div>
            </div>
          ))}
        </div>
        
        {/* Button */}
        <div className={`relative overflow-hidden w-full h-10 bg-gray-200 rounded mt-6 ${shimmer}`}></div>
      </div>
    </div>
  );
}

// Actions Card Skeleton
export function ActionsCardSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <div className={`relative overflow-hidden h-6 bg-gray-200 rounded w-1/4 mb-4 ${shimmer}`}></div>
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-1/2 ${shimmer}`}></div>
            <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-6 ${shimmer}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Number of Classes Skeleton
export function NumberOfClassesSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <div className={`relative overflow-hidden h-6 bg-gray-200 rounded w-1/4 ${shimmer}`}></div>
        <div className={`relative overflow-hidden h-8 bg-gray-200 rounded w-32 ${shimmer}`}></div>
      </div>
      <div className={`relative overflow-hidden h-64 bg-gray-100 rounded ${shimmer}`}></div>
    </div>
  );
}

export function WeeklyScheduleSkeleton() {
    return (
      <div className="bg-white rounded-lg shadow-sm ">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center p-4 ">
          <div className={`relative overflow-hidden h-6 bg-gray-200 rounded w-1/4 ${shimmer}`}></div>
          <div className="flex items-center space-x-2">
            <div className={`relative overflow-hidden w-6 h-6 bg-gray-200 rounded-full ${shimmer}`}></div>
            <div className={`relative overflow-hidden h-5 bg-gray-200 rounded w-24 ${shimmer}`}></div>
            <div className={`relative overflow-hidden w-6 h-6 bg-gray-200 rounded-full ${shimmer}`}></div>
          </div>
        </div>
  
        {/* Table Skeleton */}
        <div className="overflow-x-auto p-2">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-100">
                <th className={`relative overflow-hidden h-10 bg-gray-200 border border-gray-200 ${shimmer}`}></th>
                {[...Array(7)].map((_, i) => (
                  <th key={i} className="border border-gray-200 p-2">
                    <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-3/4 mx-auto mb-1 ${shimmer}`}></div>
                    <div className={`relative overflow-hidden h-3 bg-gray-200 rounded w-1/2 mx-auto ${shimmer}`}></div>
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* Table Body - Time Slots */}
            <tbody>
              {[...Array(12)].map((_, timeIndex) => (
                <tr key={timeIndex}>
                  {/* Time Column */}
                  <td className={`relative overflow-hidden h-8 bg-gray-100 border border-gray-200 ${shimmer}`}></td>
                  
                  {/* Day Columns */}
                  {[...Array(7)].map((_, dayIndex) => (
                    <td 
                      key={dayIndex} 
                      className={`relative overflow-hidden h-8 border border-gray-200 ${shimmer}`}
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

// Full Page Skeleton
export function TutorDetailsSkeleton() {
  return (
    <div className="flex flex-col">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <div className={`relative overflow-hidden w-8 h-8 bg-gray-200 rounded-full ${shimmer}`}></div>
          <div className={`relative overflow-hidden h-6 bg-gray-200 rounded w-32 ${shimmer}`}></div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <TutorStatsSkeleton />
        <div className="grid grid-cols-3 gap-6 items-start">
          <TutorProfileSkeleton />
          <div className="col-span-2 space-y-4">
            <WeeklyScheduleSkeleton />
            <div className="grid grid-cols-2 gap-4">
              <ActionsCardSkeleton />
              <NumberOfClassesSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}