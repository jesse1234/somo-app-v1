const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function StudentsTableSkeleton() {
  return (
    <div className="flex flex-col">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className={`relative overflow-hidden h-8 bg-gray-200 rounded w-1/4 ${shimmer}`}></div>
        <div className={`relative overflow-hidden h-10 bg-gray-200 rounded w-48 ${shimmer}`}></div>
      </div>
      
      {/* Table Skeleton */}
      <div className="p-6 bg-white rounded-lg shadow">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 mb-4">
          <div className={`relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
          <div className={`relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
          <div className={`relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
          <div className={`relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
          <div className={`relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
          <div className={`relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
        </div>
        
        {/* Table Rows */}
        {[...Array(5)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-6 gap-4 mb-4 items-center">
            {/* Name Column */}
            <div className="flex items-center space-x-3">
              <div className={`relative w-10 h-10 rounded-full bg-gray-100 ${shimmer}`}></div>
              <div className={`relative overflow-hidden h-4 bg-gray-100 rounded w-32 ${shimmer}`}></div>
            </div>
            
            {/* Other Columns */}
            <div className={`relative overflow-hidden h-4 bg-gray-100 rounded ${shimmer}`}></div>
            <div className={`relative overflow-hidden h-4 bg-gray-100 rounded ${shimmer}`}></div>
            <div className={`relative overflow-hidden h-4 bg-gray-100 rounded ${shimmer}`}></div>
            <div className={`relative overflow-hidden h-4 bg-gray-100 rounded ${shimmer}`}></div>
            
            {/* Status Column */}
            <div className={`relative overflow-hidden h-6 bg-gray-100 rounded-full w-16 ${shimmer}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TutorsTableSkeleton() {
    return (
        <div className="flex flex-col">
                {/* Header Skeleton */}
                <div className="flex justify-between items-center mb-6">
                    <div className={`relative overflow-hidden h-8 bg-gray-200 rounded w-1/4 ${shimmer}`}></div>
                    <div className={`relative overflow-hidden h-10 bg-gray-200 rounded w-48 ${shimmer}`}></div>
                </div>
                
                {/* Table Skeleton */}
                <div className="p-6 bg-white rounded-lg shadow">
                    {/* Table Header */}
                    <div className="grid grid-cols-6 gap-4 mb-4">
                    <div className={`relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
                    <div className={`relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
                    <div className={`relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
                    <div className={`relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
                    <div className={`relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
                    <div className={`relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
                    </div>
                    
                    {/* Table Rows */}
                    {[...Array(5)].map((_, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-5 gap-4 mb-4 items-center">
                        {/* Name Column */}
                        <div className="flex items-center space-x-3">
                            <div className={`relative w-10 h-10 rounded-full bg-gray-100 ${shimmer}`}></div>
                                <div className="flex flex-col space-y-2">
                                    <div className={`relative overflow-hidden h-4 bg-gray-100 rounded w-32 ${shimmer}`}></div>
                                    <div className={`relative overflow-hidden h-3 bg-gray-100 rounded w-24 ${shimmer}`}></div>
                                </div> 
                            </div>

                            {/* Email Column */}
                            <div className={`relative overflow-hidden h-4 bg-gray-100 rounded ${shimmer}`}></div>
                            
                                {/* Other Columns */}
                                <div className={`relative overflow-hidden h-4 bg-gray-100 rounded ${shimmer}`}></div>
                                <div className={`relative overflow-hidden h-4 bg-gray-100 rounded-full w-16 ${shimmer}`}></div>
                                <div className={`relative overflow-hidden h-4 bg-gray-100 rounded w-8 ${shimmer}`}></div>
                    </div>
                    ))}
                </div>
            </div>
    )

}