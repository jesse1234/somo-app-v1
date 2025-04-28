import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";
import { StudentRegistrationResponse } from "@/app/types/api";
import useAuthStore from "./useAuthHook";


export function useStudentRegistrationData(registrationTimePeriod: 'day' | 'week' | 'month' | 'year') {
    const { accessToken } = useAuthStore();

    return useQuery<StudentRegistrationResponse>({
        queryKey: ['studentRegistrations', registrationTimePeriod, accessToken],
        queryFn: async () => {
            const response = await apiClient.get<StudentRegistrationResponse>(`api/Admin/studentRegistrations?timePeriod=${registrationTimePeriod}`, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            return response;
        },
        enabled: !!registrationTimePeriod && !!accessToken
        
    })
}
