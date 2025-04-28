import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";
import { format } from 'date-fns'
import { NumberOfLessonResponse } from "@/app/types/api";

export const useNumberOfLessonsData = (startDate: Date, endDate: Date) => {
    const formatForApi = (date: Date) => format(date, 'yyyy-MM-dd HH:mm:ss');

    return useQuery<NumberOfLessonResponse>({
        queryKey: ['numberOfLessons', startDate, endDate],
        queryFn: async () => {
            const response = await apiClient.get<NumberOfLessonResponse>(`/api/Admin/numberOfClasses`, {
                params: { startDate: formatForApi(startDate), endDate: formatForApi(endDate) }
              });
        return response;
        },
    })
} 