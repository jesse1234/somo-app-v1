'use client';

import { Chart } from "../ui/Chart";
import { useStudentRegistrationData } from "@/store/useStudentRegistrationData";
import { ChartSkeleton } from "../skeletons/DashboardSkeleton";

export function StudentRegistrationChart({
    registrationTimePeriod,
    setRegistrationTimePeriod
} : {
    registrationTimePeriod: 'day' | 'week' | 'month' | 'year',
    setRegistrationTimePeriod: (period: 'day' | 'week' | 'month' | 'year') => void

}) {
    const { data, isLoading, isFetching } = useStudentRegistrationData(registrationTimePeriod);

    if(isLoading || isFetching) {
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

    const registrationChartOptions = {
        ...chartOptions, // Use the base chart options
        plugins: {
            ...chartOptions.plugins,
            title: {
                display: false,
            },
        },
        scales: {
            ...chartOptions.scales,
            y: {
                ...chartOptions.scales.y,
                ticks: {
                    stepSize: 20, // Matches the example image's y-axis steps
                },
            },
        },
    };

    const transformedRegistrationData = {
        labels: data?.data.data.map(item => {
            const date = new Date(item.label);
            switch (registrationTimePeriod) {
                case 'day':
                    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                case 'week':
                    const [datePart, dayName] = item.label.split(' ');
                    const weekDate = new Date(datePart);
                    return `${dayName} ${weekDate.getDate()}`;
                case 'month':
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                case 'year':
                    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                default:
                    return item.label;
            }
        }) || [],
        datasets: [
            {
                label: 'Registrations',
                data: data?.data.data.map(item => item.count) || [],
                borderColor: '#6E39CB',
                backgroundColor: '#6E39CB',
                tension: 0.4, 
                fill: {
                    target: 'origin',
                    above: 'rgba(59, 130, 246, 0.1)', 
                },
            },
        ],
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow h-64">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold mb-2">Student Registration Metrics</h3>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                    <button 
                        className={`px-4 py-1 text-sm font-medium rounded-lg transition-all cursor-pointer duration-200 ${
                        registrationTimePeriod === 'day' 
                            ? 'bg-white text-primary shadow' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => setRegistrationTimePeriod('day')}
                    >
                        Day
                    </button>
                    <button 
                        className={`px-4 py-1 text-sm font-medium rounded-lg transition-all cursor-pointer duration-200 ${
                        registrationTimePeriod === 'week' 
                            ? 'bg-white text-primary shadow' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => setRegistrationTimePeriod('week')}
                    >
                        Week
                    </button>
                    <button 
                        className={`px-4 py-1 text-sm font-medium rounded-lg transition-all cursor-pointer duration-200 ${
                        registrationTimePeriod === 'month' 
                        ? 'bg-white text-primary shadow' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setRegistrationTimePeriod('month')}
                    >
                        Month
                    </button>
                    <button 
                        className={`px-4 py-1 text-sm font-medium rounded-lg transition-all cursor-pointer duration-200 ${
                        registrationTimePeriod === 'year' 
                        ? 'bg-white text-primary shadow' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                     onClick={() => setRegistrationTimePeriod('year')}
                    >
                        Year
                    </button>
                </div>
            </div>
            <div className="h-48">
                <Chart 
                    data={transformedRegistrationData}
                    options={registrationChartOptions}
                />
            </div>
        </div>
    );
}