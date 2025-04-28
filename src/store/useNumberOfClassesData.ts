// import { useQuery } from "@tanstack/react-query";
// import apiClient from "@/app/lib/api";
// import useAuthStore from "./useAuthStore";

// export function useNumberOfClassesData(tutorId: string, dateRange: {startDate: Date; endDate: Date}) {
//     const { accessToken } = useAuthStore()
    
//     return useQuery({
//         queryKey: ['numberOfClasses', tutorId, dateRange],
//         queryFn: async () => {
//             const response = await apiClient.get(`/api/Admin/tutor/${tutorId}/classes`, {
//                 params: {
//                     startDate: dateRange.startDate.toISOString(),
//                     endDate: dateRange.endDate.toISOString()
//                 },
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             });
//             return response;
//         },
//         enabled: !!accessToken
//     })
// }