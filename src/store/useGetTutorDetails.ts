import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/lib/api";
import { TutorDetailsResponse } from "@/app/types/api";

export const useTutorDetails = (tutorId: string) => {
    return useQuery<TutorDetailsResponse>({
        queryKey: ['tutorDetails', tutorId],
        queryFn: async (): Promise<TutorDetailsResponse> => {
            const response = await apiClient.get<TutorDetailsResponse>(`/api/Admin/tutor/${tutorId}/summary`);
            return response;
        }
    })
}