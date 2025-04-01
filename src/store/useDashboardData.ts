import { useQuery } from "@tanstack/react-query";
import apiClient from '@/app/lib/apiClient';
import { DashboardResponse } from "@/app/types/api";

export function useDashboardData() {
    return useQuery<DashboardResponse>({
        queryKey: ['adminDashboard'],
        queryFn: async () => {
            const response = await apiClient.get('/api/Admin/Dashboard');
            return response.data;
        }
    });
}

