'use client';

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";
import {  StudentsResponse, QueryParams, StudentData, PaginationInfo } from "@/app/types/api";
import useAuthStore from "./useAuthStore";

export const useStudents = (queryParams: QueryParams = {}) => {
    const { accessToken } = useAuthStore();

    return useQuery<{ students: StudentData[]; pagination: PaginationInfo }>({
        queryKey: ['students', accessToken, queryParams],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (queryParams.sortBy) params.append('sortBy', queryParams.sortBy);
            if (queryParams.sortDescending !== undefined)
                params.append('sortDescending', queryParams.sortDescending.toString());
            if (queryParams.page) params.append('page',queryParams.page.toString());
            if (queryParams.pageSize) params.append('pageSize', queryParams.pageSize.toString());
            if (queryParams.searchTerm) params.append('searchTerm', queryParams.searchTerm);

            const response = await apiClient.get<StudentsResponse>(`/api/Admin/getAllStudents?${params.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            return response.data;
        },
        enabled: !!accessToken,
        //keepPreviousData: true
    })
}