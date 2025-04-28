import { SidebarResponse } from "@/app/types/api";
import useAuthStore from "./useAuthHook"
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";

export const useGetSidebarMenu = () => {
    const { accessToken } = useAuthStore();

    return useQuery<SidebarResponse>({
        queryKey: ['sidebarMenu', accessToken],
        queryFn: async () => {
            const response = await apiClient.get<SidebarResponse>('/api/Admin/menu',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            return response;
        },
        enabled: !!accessToken
    })
}