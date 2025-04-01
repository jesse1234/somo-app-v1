import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/apiClient";
import { ActiveUserResponse } from "@/app/types/api";

export function useActiveUserData (timePeriod: 'day' | 'week' | 'month') {
    return useQuery<ActiveUserResponse>({
        queryKey: ['activeUsers', timePeriod],
        queryFn: async () => {
            const response = await apiClient.get(`api/Admin/activeUsers?timePeriod=${timePeriod}`);
            return response.data;
        },
        enabled: !!timePeriod
    })
}
