import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";
import { ActiveUserResponse } from "@/app/types/api";
import useAuthStore from "./useAuthHook";

export function useActiveUserData (timePeriod: 'day' | 'week' | 'month') {
    const { accessToken } = useAuthStore();
    return useQuery<ActiveUserResponse>({
        queryKey: ['activeUsers', timePeriod, accessToken],
        queryFn: async () => {
            const response = await apiClient.get<ActiveUserResponse>(`api/Admin/activeUsers?timePeriod=${timePeriod}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            return response;
        },
        enabled: !!timePeriod && !!accessToken
    })
}
