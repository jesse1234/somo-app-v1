"use client"

import { useState } from "react"
import { Card, CardContent } from "@/app/components/ui/Cards"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { format, addDays, startOfWeek, addWeeks, subWeeks, parseISO, isSameDay } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import apiClient from "@/app/lib/apiClient"
import { TutorScheduleResponse } from "@/app/types/api"
import { WeeklyScheduleSkeleton } from "../skeletons/TutorDetailsSkeleton"

interface WeeklyScheduleProps {
  tutorId: string
  className?: string
}

export default function WeeklySchedule({ tutorId, className }: WeeklyScheduleProps) {
  const [currentDate] = useState(new Date())
  const [weekStart, setWeekStart] = useState(startOfWeek(currentDate, { weekStartsOn: 1 }))

  // Fetch schedule data
  const { data: scheduleData, isLoading } = useQuery<TutorScheduleResponse>({
    queryKey: ['tutorSchedule', tutorId],
    queryFn: async () => {
      const response = await apiClient.get(
        `/api/Availability/tutor/${tutorId}/schedules?timeZoneId=Africa%2FNairobi&months=1`
      )
      return response.data
    }
  })

  if (isLoading) return <WeeklyScheduleSkeleton />

  // Time slots from 7AM to 6PM
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 7 // Starting from 7AM
    return `${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`
  })

  // Check if a specific day and time slot has an appointment
  const hasAppointment = (day: Date, timeSlot: string) => {
    if (!scheduleData?.data) return false
    
    const [startTime] = timeSlot.split('-')
    const hour = parseInt(startTime.split(':')[0])
    
    return scheduleData.data.some(appointment => {
      const appointmentDate = parseISO(appointment.date)
      return (
        isSameDay(appointmentDate, day) &&
        appointment.startHour === hour
      )
    })
  }

  // Navigation functions
  const goToPreviousWeek = () => setWeekStart(subWeeks(weekStart, 1))
  const goToNextWeek = () => setWeekStart(addWeeks(weekStart, 1))

  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i)
    return {
      name: format(date, "EEE").toUpperCase(),
      date: format(date, "dd"),
      fullDate: date,
    }
  })

  return (
    <Card className={`shadow-sm ${className}`}>
      <CardContent className="p-0 flex flex-col"> 
       {/* Header Section */}
        <div className="flex justify-between items-center p-4 border-b w-full">
          <h2 className="text-lg font-semibold text-gray-800 ml-2">Weekly Schedule</h2>
          <div className="flex items-center space-x-2 mr-2">
            <button 
              onClick={goToPreviousWeek} 
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium">
              {format(weekStart, "MMM dd")} - {format(addDays(weekStart, 6), "dd")}
            </span>
            <button 
              onClick={goToNextWeek} 
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
  
        {/* Schedule Grid */}
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2 text-center font-medium text-gray-600">Time</th>
                {weekDays.map((day, index) => (
                  <th key={index} className="border border-gray-200 p-2 text-center font-medium text-gray-600">
                    <div className="font-semibold">{day.name}</div>
                    <div className="text-xs">{day.date}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot, timeIndex) => (
                <tr key={timeIndex} className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-2 text-center font-medium text-gray-600 bg-gray-100">
                    {timeSlot}
                  </td>
                  {weekDays.map((day, dayIndex) => (
                    <td
                      key={dayIndex}
                      className={`border border-gray-200 p-2 text-center relative h-8
                        ${hasAppointment(day.fullDate, timeSlot) ? "bg-blue-700" : ""}`}
                    >
                      {hasAppointment(day.fullDate, timeSlot) && (
                        <Check className="h-3 w-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
