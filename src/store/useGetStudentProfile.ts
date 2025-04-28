'use client';

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";
import { StudentProfileResponse } from "@/app/types/api";
import useAuthStore from "./useAuthHook";

export const useStudentProfile = (studentId: string) => {
    const { accessToken } = useAuthStore(); 

    return useQuery<StudentProfileResponse>({
        queryKey: ['StudentProfile', studentId, accessToken],
        queryFn: async (): Promise<StudentProfileResponse> => {
            const response = await apiClient.get<StudentProfileResponse>(`/api/Admin/studentProfile/${studentId}`,
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