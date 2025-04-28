import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";
import useAuthStore from "./useAuthHook";
import { TutorQueryParams, TutorResponse } from "@/app/types/api";

export const useTutors = (queryParams: TutorQueryParams) => {
    const { accessToken } = useAuthStore();

    return useQuery<TutorResponse>({
        queryKey: ['tutors', accessToken, queryParams],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (queryParams.sortBy) params.append('sortBy', queryParams.sortBy);
            if (queryParams.sortDescending !== undefined)
                params.append('sortDescending', queryParams.sortDescending.toString())
            if (queryParams.page) params.append('page', queryParams.page.toString());
            if (queryParams.pageSize) params.append('pageSize', queryParams.pageSize.toString());
            if (queryParams.searchTerm) params.append('searchTerm', queryParams.searchTerm.toString());
            if (queryParams.status) params.append('status', queryParams.status);
            if (queryParams.startDate) params.append('startDate', queryParams.startDate);
            if (queryParams.endDate) params.append('endDate', queryParams.endDate);
            if (queryParams.minStudents) params.append('minStudents', queryParams.minStudents.toString());
            if (queryParams.maxStudents) params.append ('maxStudents', queryParams.maxStudents.toString());

            const response = await apiClient.get<TutorResponse>(`/api/Admin/getAllTutors?${params.toString()}`, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            console.log('API Response:', response);
            return response ?? {
                data: {
                    tutors: [],
                    pagination: {
                        totalCount: 0,
                        totalPages: 0,
                        currentPage: 1,
                        pageSize: 10
                    }
                }
            };
            
        },
        enabled: !!accessToken,
    })
}

// const { data, isLoading, isError } = useQuery<TutorResponse>({
//     queryKey: ['tutors'],
//     queryFn: async () => {
//         const response = await apiClient.get('/api/Admin/getAllTutors');
//         return response.data;
//     }
// });