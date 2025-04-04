import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";
import useAuthStore from "./useAuthStore";
import { AdminResponse } from "@/app/types/api";


export const useGetAdmins = () => {
    const { accessToken } = useAuthStore();

    return useQuery<AdminResponse>({
        queryKey: ['admins'],
        queryFn: async () => {
            const response = await apiClient.get<AdminResponse>('/api/Admin/admins', 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            return response;
        }
    })
}