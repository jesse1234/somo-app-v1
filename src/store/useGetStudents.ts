'use client';

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";
import {  StudentsResponse, StudentQueryParams, StudentData, PaginationInfo } from "@/app/types/api";
import useAuthStore from "./useAuthHook";

export const useStudents = (queryParams: StudentQueryParams = {}) => {
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
            if (queryParams.accountType) params.append('accountType', queryParams.accountType);
            if (queryParams.status) params.append('status', queryParams.status);
            if (queryParams.startDate) params.append('startDate', queryParams.startDate);
            if (queryParams.endDate) params.append('endDate', queryParams.endDate);

            const response = await apiClient.get<StudentsResponse>(`/api/Admin/getAllStudents?${params.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            return response?.data ?? {
                students: [],
                pagination: {
                    totalCount: 0,
                    totalPages: 0,
                    currentPage: 1,
                    pageSize: 10
                }
            };
        },
        enabled: !!accessToken,
        //keepPreviousData: true
    })
}