'use client';

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";
import { StudentData, StudentResponse } from "@/app/types/api";
import useAuthStore from "./useAuthStore";

export const useStudents = () => {
    const { accessToken } = useAuthStore();

    return useQuery<StudentData[]>({
        queryKey: ['students', accessToken],
        queryFn: async () => {
            const response = await apiClient.get<StudentResponse>('/api/Admin/getAllStudents',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            return response.data;
        },
        enabled: !!accessToken
    })
}