'use client ';
 
import { useDashboardData } from "@/store/useDashboardData";
import { StatCardsSkeleton } from "../skeletons/DashboardSkeleton";
 
export function StatCards() {
    const { data, isLoading, isFetching } = useDashboardData();

    if(isLoading || isFetching) {
        return <StatCardsSkeleton />
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="grid grid-cols-5 gap-6">
                <div className="border-r border-dashed border-input-gray pr-6">
                    <h3 className="text-sm text-dark-gray mb-2">Total Active Users</h3>
                    <p className="text-2xl font-bold text-primary">
                        {data?.data.totalUsers.toLocaleString()}
                    </p>
                    <p className="text-xs text-light-gray mt-2">
                    {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                </div>

                <div className="border-r border-dashed border-input-gray pr-6">
                    <h3 className="text-sm text-dark-gray mb-2">Total Tutors</h3>
                    <p className="text-2xl font-bold text-primary">
                    {data?.data.totalTutors.toLocaleString()}
                </p>
                <p className="text-xs text-light-gray mt-2"> 
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
            </div>

            <div className="border-r border-dashed border-input-gray pr-6">
                <h3 className="text-sm text-dark-gray mb-2">Total Students</h3>
                <p className="text-2xl font-bold text-primary">
                    {data?.data.totalStudents.toLocaleString()}
                </p>
                <p className="text-xs text-light-gray mt-2">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
            </div>

            <div className="border-r border-dashed border-input-gray pr-6">
                <h3 className="text-sm text-dark-gray mb-2">Total Lessons</h3>
                <p className="text-2xl font-bold text-primary">
                    {/* {dashboardData?.data.totalLessons.toLocaleString()} */}
                    0
                </p>
                <p className="text-xs text-light-gray mt-2">--</p>
            </div>

            <div className="">
                <h3 className="text-sm text-dark-gray mb-2">Total Amount in Escrow</h3>
                <p className="text-2xl font-bold text-primary">
                    Ksh {data?.data.totalAmountInPaybill.toLocaleString()}</p>
                <p className="text-xs text-light-gray mt-2">Paid Off to 0 Tutors</p>
            </div>
        </div>
    </div>
    );
}