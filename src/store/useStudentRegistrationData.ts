import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/apiClient";
import { StudentRegistrationResponse } from "@/app/types/api";


export function useStudentRegistrationData(registrationTimePeriod: 'day' | 'week' | 'month' | 'year') {
    //const [registrationTimePeriod, setRegistrationTimePeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');

    return useQuery<StudentRegistrationResponse>({
        queryKey: ['studentRegistrations', registrationTimePeriod],
        queryFn: async () => {
            const response = await apiClient.get(`api/Admin/studentRegistrations?timePeriod=${registrationTimePeriod}`);
            return response.data;
        },
        enabled: !!registrationTimePeriod
    })
}
