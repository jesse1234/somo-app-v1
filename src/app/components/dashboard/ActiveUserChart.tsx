'use client';

import { Chart } from "../ui/Chart";
import { useActiveUserData } from "@/store/useActiveUserData";
import { ChartSkeleton } from "../skeletons/DashboardSkeleton";
// import { ChartOptions } from "chart.js";

export function ActiveUserChart({
    timePeriod,
    setTimePeriod
} : {
    timePeriod: 'day' | 'week' | 'month',
    setTimePeriod: (period: 'day' | 'week' | 'month') => void
}) {
    const { data, isLoading, isFetching } = useActiveUserData(timePeriod);

    if (isLoading || isFetching) {
        return <ChartSkeleton />
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    usePointStyle: true,
                }
            }, 
            title: {
                display: false,
                text: 'Active Users',
            },
        },
        scales: {
            y: {
                type: 'linear' as const, // Ensure correct scale type
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                    display: true, // Ensure display is explicitly defined
                },
                ticks: {
                    precision: 0, // Ensure proper typing for ticks
                }
            },
            x: {
                type: 'category' as const, // Ensure correct scale type
                grid: {
                    display: false,
                },
            },
        },
    } as const; // This ensures TypeScript correctly infers the structure    
    

    const transformActiveUsersData = {
        labels: data?.data.studentData.map(item => {
            const date = new Date(item.date);
            switch (timePeriod) {
                case 'day':
                    return date.toLocaleTimeString('en-US', { month:'short',  day: 'numeric', hour: '2-digit', minute: '2-digit' });
                case 'week':
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                case 'month':
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }
        }) || [],
        datasets: [{
            label: 'Students',
            data: data?.data.studentData.map(item => item.count) || [],
            borderColor: '#10B981',
            backgroundColor: '#10B981',
            tension: 0.4,
            fill: {
                target: 'origin',
                above: 'rgba(16, 185, 129, 0.1)'
            },
        },
        {
            label: 'Tutors',
            data: data?.data.tutorData.map(item => item.count) || [],
            borderColor: '#F59E0B',
            backgroundColor: '#F59E0B',
            tension: 0.4,
            fill: {
                target: 'origin',
                above: 'rgba(245, 158, 11, 0.1)',
            },
        },
    ],
};

    return (
        <div className="bg-white p-4 rounded-lg shadow h-64">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold mb-2">Active Users</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button 
                        className={`px-4 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${timePeriod === 'day' ? 'bg-white text-primary shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => setTimePeriod('day')}>
                        Day
                    </button>
                    <button 
                        className={`px-4 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${timePeriod === 'week' ? 'bg-white text-primary shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => setTimePeriod('week')}>
                         Week
                    </button>
                    <button 
                        className={`px-4 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${timePeriod === 'month' ? 'bg-white text-primary shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => setTimePeriod('month')}>
                        Month
                    </button>
                </div>
            </div>
            <div className="h-48">         
                         <Chart 
                            data={transformActiveUsersData}
                            options={chartOptions}
                        />
            </div>
        </div>
    )
}