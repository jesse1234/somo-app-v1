'use client'

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js"
import { useQuery } from "@tanstack/react-query"
import apiClient from "@/app/lib/apiClient"
import { format, startOfWeek, endOfWeek } from 'date-fns'
import { NumberOfLessonResponse } from "@/app/types/api"
import { NumberOfClassesSkeleton } from "../skeletons/TutorDetailsSkeleton"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface BarChartProps {
  dateRange?: {
    startDate: Date
    endDate: Date
  }
}

interface LessonDataItem {
  dayOfWeek: string;
  bookingCount: number;
}

const BarChart = ({ dateRange }: BarChartProps) => {
  const defaultStart = startOfWeek(new Date())
  const defaultEnd = endOfWeek(new Date())
  
  const startDate = dateRange?.startDate || defaultStart
  const endDate = dateRange?.endDate || defaultEnd

  // Format dates (YYYY-MM-DD HH:mm:ss)
  const formatForApi = (date: Date) => format(date, 'yyyy-MM-dd HH:mm:ss')

  // Fetch data from API
  const { data, isLoading, error } = useQuery<NumberOfLessonResponse>({
    queryKey: ['weeklyClasses', startDate, endDate],
    queryFn: async () => {
      const response = await apiClient.get(`/api/Admin/numberOfClasses`, {
        params: { startDate: formatForApi(startDate), endDate: formatForApi(endDate) }
      })
      return response.data
    }
  })

  // Handle loading & error states
  if (isLoading) return (<NumberOfClassesSkeleton />)
  if (error) return <div className="text-red-500">Error fetching data</div>

  // Map weekdays to shorter labels
  const dayMap: Record<string, string> = {
    'Monday': 'Mon', 'Tuesday': 'Tue', 'Wednesday': 'Wed',
    'Thursday': 'Thu', 'Friday': 'Fri', 'Saturday': 'Sat', 'Sunday': 'Sun'
  }

  // Initialize all weekdays with 0
  const weeklyData = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }

  // Aggregate API data into `weeklyData`
  data?.data?.forEach((item: LessonDataItem) => {
    const dayAbbr = dayMap[item.dayOfWeek] as keyof typeof weeklyData;
    if (dayAbbr) {
      weeklyData[dayAbbr] += item.bookingCount;
    }
  });

  const chartData = {
    labels: Object.keys(weeklyData),
    datasets: [{
      label: 'Classes per Day',
      data: Object.values(weeklyData),
      backgroundColor: '#4338ca',
      borderColor: '#4338ca',
      borderWidth: 0,
      borderRadius: 4,
      barThickness: 20
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: { beginAtZero: true, grid: { display: true, drawBorder: false }, ticks: { stepSize: 1 } },
      x: { grid: { display: false } }
    }
  }

  return (
    <div className="h-64">
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default BarChart