import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/apiClient";

export function useNumberOfClassesData(tutorId: string, dateRange: {startDate: Date; endDate: Date}) {
    return useQuery({
        queryKey: ['numberOfClasses', tutorId, dateRange],
        queryFn: async () => {
            const response = await apiClient.get(`/api/Admin/tutor/${tutorId}/classes`, {
                params: {
                    startDate: dateRange.startDate.toISOString(),
                    endDate: dateRange.endDate.toISOString()
                }
            });
            return response.data;
        }
    })
}