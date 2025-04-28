import { useQuery } from "@tanstack/react-query";
import useAuthStore from "./useAuthHook"
import { TutorScheduleResponse } from "@/app/types/api";
import apiClient from "@/app/lib/api";

export const useGetWeeklySchedule = (tutorId: string) => {
    const { accessToken } = useAuthStore();

    return useQuery<TutorScheduleResponse>({
        queryKey:['tutorSchedule', tutorId, accessToken],
        queryFn: async () => {
            const response = await apiClient.get<TutorScheduleResponse>(
                `/api/Availability/tutor/${tutorId}/schedules?timeZoneId=Africa%2FNairobi&months=1`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            return response
        },
        enabled: !!accessToken
    })
}