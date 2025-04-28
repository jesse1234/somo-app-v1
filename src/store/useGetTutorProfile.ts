import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";
import { TutorProfileResponse } from "@/app/types/api";

export const useTutorProfile = (tutorId: string) => {
    return useQuery<TutorProfileResponse>({
        queryKey: ['tutorProfile', tutorId],
        queryFn: async (): Promise<TutorProfileResponse> => {
            const response = await apiClient.get<TutorProfileResponse>(`/api/Admin/tutorProfile/${tutorId}`);
            return response;
        }
    })
}