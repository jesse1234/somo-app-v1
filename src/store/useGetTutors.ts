import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";
import useAuthStore from "./useAuthStore";
import { TutorResponse } from "@/app/types/api";

export const useTutors = () => {
    const { accessToken } = useAuthStore();

    return useQuery<TutorResponse>({
        queryKey: ['tutors'],
        queryFn: async () => {
            const response = await apiClient.get<TutorResponse>('api/Admin/getAllTutors', 
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

// const { data, isLoading, isError } = useQuery<TutorResponse>({
//     queryKey: ['tutors'],
//     queryFn: async () => {
//         const response = await apiClient.get('/api/Admin/getAllTutors');
//         return response.data;
//     }
// });