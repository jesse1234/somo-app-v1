const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export function StudentProfileSkeleton() {
    return (
        <div className="flex flex-col">
            {/* <div className="flex justify-between items-center p-6">
                <div className="flex items-center gap-4">
                    <div className={`relative overflow-hidden w-8 h-8 bg-gray-200 rounded-full ${shimmer}`}></div>
                    <div className={`relative overflow-hidden h-6 bg-gray-200 rounded-w-32 ${shimmer}`}></div>
                </div>
            </div> */}

            <div className="grid grid-cols-4 gap-6 p-6 items-start">
                {/* Parent Account */}
                <div className="col-span-1 shadow-lg rounded-lg self-start h-fit bg-white">
                    <div className="flex flex-col items-center p-6">
                        {/* Profile Picture */}
                        <div className={`relative w-32 h-32 mb-4 bg-gray-200 rounded-full ${shimmer}`}></div>

                        {/* Name */}
                        <div className={`relative overflow-hidden h-6 bg-gray-200 rounded w-3/4 mb-2 ${shimmer}`}></div>

                        {/* Profile Completion */}
                        <div className="w-full mb-4 px-2 mt-2">
                            <div className={`relative overflow-hidden h-4 mb-2 bg-gray-200 rounded w-1/2 ${shimmer}`}></div>
                            <div className="flex items-center gap-3">
                                <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-8 ${shimmer}`}></div>
                                <div className={`relative overflow-hidden flex-l bg-gray-200 rounded-full h-2.5 ${shimmer}`}></div>

                            </div>
                        </div>
                        {/* Profile Details */}
                        <div className="w-full mt-6 space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i}>
                                    <div className={`relative overflow-hidden h-3 bg-gray-200 rounded w-1/3 mb-1${shimmer}`}></div>
                                    <div className={`relative overflow-hidden h-4 bg-gray-200 rounded w-full ${shimmer}`}></div>
                                </div>
                            ))}
                        </div>

                        {/* Generate Report */}
                        <div className={`relative overflow-hidden w-full h-10 bg-gray-200 rounded mt-6 ${shimmer}`}></div>
                    </div>
                </div>
                {/* Right Content - Child Accounts Skeleton */}
                <div className="col-span-3 space-y-6">
                {[...Array(2)].map((_, index) => (
                    <div key={index} className="shadow-lg rounded-lg bg-white">
                    {/* Child Header */}
                    <div className="p-6 flex items-center">
                        <div className="flex items-center space-x-4">
                        <div className={`relative w-16 h-16 rounded-full bg-gray-200 ${shimmer}`}></div>
                        <div className={`relative overflow-hidden h-6 bg-gray-200 rounded w-32 ${shimmer}`}></div>
                        </div>
                        <div className="flex space-x-3 ml-auto">
                        <div className={`relative overflow-hidden w-20 h-9 bg-gray-200 rounded ${shimmer}`}></div>
                        <div className={`relative overflow-hidden w-32 h-9 bg-gray-200 rounded ${shimmer}`}></div>
                        </div>
                    </div>

                    {/* Child Details */}
                    <div className="p-6 grid grid-cols-2 gap-6">
                        {[...Array(5)].map((_, i) => (
                        <div key={i}>
                            <div className={`relative overflow-hidden h-3 bg-gray-200 rounded w-1/3 mb-2 ${shimmer}`}></div>
                            <div className={`relative overflow-hidden h-10 bg-gray-200 rounded w-full ${shimmer}`}></div>
                        </div>
                        ))}
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}