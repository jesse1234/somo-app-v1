import { useQuery } from "@tanstack/react-query";
import apiClient from '@/app/lib/api';
import { DashboardResponse } from "@/app/types/api";
import useAuthStore from "./useAuthHook";

export function useDashboardData() {
    const { accessToken } = useAuthStore();
    
    return useQuery<DashboardResponse>({
        queryKey: ['adminDashboard', accessToken],
        queryFn: async () => {
            const response = await apiClient.get<DashboardResponse>('/api/Admin/Dashboard',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            return response;
        },
        enabled: !!accessToken
    });
}

