// components/skeletons/TutorEditSkeleton.tsx
const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

// Profile Skeleton (Left Sidebar)
export function TutorEditProfileSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow h-fit">
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <div className={`relative w-32 h-32 rounded-full bg-gray-200 mb-4 ${shimmer}`}></div>
        
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
        <div className="w-full space-y-4">
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

// Stepper Skeleton
export function StepperSkeleton() {
  return (
    <div className="flex justify-between mb-6 px-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className={`relative overflow-hidden w-8 h-8 bg-gray-200 rounded-full mb-2 ${shimmer}`}></div>
          <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-16 ${shimmer}`}></div>
        </div>
      ))}
    </div>
  );
}

// About Step Skeleton
export function AboutStepSkeleton() {
  return (
    <div className="p-6">
      <div className={`relative overflow-hidden h-8 bg-gray-200 rounded w-1/4 mb-8 ${shimmer}`}></div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-1/3 mb-2 ${shimmer}`}></div>
            <div className={`relative overflow-hidden h-10 bg-gray-200 rounded ${shimmer}`}></div>
          </div>
        ))}
      </div>
      <div className={`relative overflow-hidden h-10 bg-gray-200 rounded w-24 mt-8 ml-auto ${shimmer}`}></div>
    </div>
  );
}

// Documents Step Skeleton
export function DocumentsStepSkeleton() {
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <div className={`relative overflow-hidden h-8 bg-gray-200 rounded w-1/4 ${shimmer}`}></div>
        <div className={`relative overflow-hidden h-10 bg-gray-200 rounded w-32 ${shimmer}`}></div>
      </div>
      <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-1/2 mb-6 ${shimmer}`}></div>
      
      {/* Table Skeleton */}
      <div className="space-y-2">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 mb-2">
          <div className={`col-span-1 relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
          <div className={`col-span-4 relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
          <div className={`col-span-3 relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
          <div className={`col-span-4 relative overflow-hidden h-6 bg-gray-200 rounded ${shimmer}`}></div>
        </div>
        
        {/* Table Rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 items-center py-3">
            <div className={`col-span-1 relative overflow-hidden h-5 bg-gray-200 rounded ${shimmer}`}></div>
            <div className={`col-span-4 relative overflow-hidden h-5 bg-gray-200 rounded ${shimmer}`}></div>
            <div className={`col-span-3 relative overflow-hidden h-5 bg-gray-200 rounded ${shimmer}`}></div>
            <div className={`col-span-4 relative overflow-hidden h-5 bg-gray-200 rounded ${shimmer}`}></div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end space-x-4 mt-8">
        <div className={`relative overflow-hidden h-10 bg-gray-200 rounded w-24 ${shimmer}`}></div>
        <div className={`relative overflow-hidden h-10 bg-gray-200 rounded w-24 ${shimmer}`}></div>
      </div>
    </div>
  );
}

// Report Step Skeleton
export function ReportStepSkeleton() {
  return (
    <div className="p-6">
      <div className={`relative overflow-hidden h-8 bg-gray-200 rounded w-1/4 mb-6 ${shimmer}`}></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-6">
            <div className="flex gap-6">
              {/* Image */}
              <div className={`relative w-32 h-32 bg-gray-200 rounded-md ${shimmer}`}></div>
              
              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className={`relative overflow-hidden h-5 bg-gray-200 rounded w-16 ${shimmer}`}></div>
                <div className={`relative overflow-hidden h-6 bg-gray-200 rounded w-3/4 ${shimmer}`}></div>
                <div className="space-y-2">
                  <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-1/4 ${shimmer}`}></div>
                  <div className={`relative overflow-hidden h-3 bg-gray-200 rounded w-full ${shimmer}`}></div>
                  <div className={`relative overflow-hidden h-3 bg-gray-200 rounded w-5/6 ${shimmer}`}></div>
                </div>
                <div className="mt-4 space-y-1">
                  <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-1/4 ${shimmer}`}></div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, starIdx) => (
                      <div key={starIdx} className={`relative overflow-hidden w-4 h-4 bg-gray-200 rounded ${shimmer}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className={`relative overflow-hidden h-10 bg-gray-200 rounded w-24 mt-8 ml-auto ${shimmer}`}></div>
    </div>
  );
}

// Full Page Skeleton
export function TutorEditSkeleton() {
  return (
    <div className="flex flex-col">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <div className={`relative overflow-hidden w-8 h-8 bg-gray-200 rounded-full ${shimmer}`}></div>
          <div className={`relative overflow-hidden h-6 bg-gray-200 rounded w-32 ${shimmer}`}></div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6 p-6 items-start">
        {/* Left Sidebar */}
        <div className="col-span-1">
          <TutorEditProfileSkeleton />
        </div>
        
        {/* Right Content */}
        <div className="col-span-3">
          <StepperSkeleton />
          
          <div className="bg-white rounded-lg shadow min-h-[600px]">
            {/* This would be replaced with the specific step skeleton based on active step */}
            <AboutStepSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}