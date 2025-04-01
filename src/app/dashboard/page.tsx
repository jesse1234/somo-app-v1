'use client';

import { Suspense } from "react";
import { Header } from "../components/ui/Header";
import { StatCardsSkeleton, ChartSkeleton, ActionsSkeleton } from '@/app/components/skeletons/DashboardSkeleton';
import { StatCards } from "../components/dashboard/StatCards";
import { ActiveUserChart } from "../components/dashboard/ActiveUserChart";
import { StudentRegistrationChart } from "../components/dashboard/RegistrationChartData";
import { ActionsCard } from "../components/dashboard/ActionsCard";
import { useState } from "react";

export default function DashboardPage() {
    const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month'>('month');
    const [registrationTimePeriod, setRegistrationTimePeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');

    return (
        <div className="flex flex-col">
            <Header userName="Admin" header="Analytics"/>

            {/* Stat Cards */}
            <Suspense fallback={<StatCardsSkeleton/>}>
                <StatCards />
            </Suspense>

            {/* Charts Section */}
            <div className="grid grid-cols-3 gap-4 flex-l">
                <div className="col-span-2 space-y-4">
                    {/* Active Users Chart */}
                    <Suspense fallback={<ChartSkeleton />}>
                        <ActiveUserChart 
                            timePeriod={timePeriod} 
                            setTimePeriod={setTimePeriod} 
                        />
                    </Suspense>

                    {/* Student Registration Chart */}
                    <Suspense fallback={<ChartSkeleton />}>
                    <StudentRegistrationChart 
                            registrationTimePeriod={registrationTimePeriod} 
                            setRegistrationTimePeriod={setRegistrationTimePeriod}
                        />
                    </Suspense>
                    
                </div>
                {/* Actions Column */}
                <Suspense fallback={<ActionsSkeleton />}>
                    <ActionsCard />
                </Suspense>
            </div>
        </div>
    );
}