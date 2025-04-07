import { useState } from 'react';
import apiClient from '@/app/lib/api';
import { AxiosError } from 'axios';
import useAuthStore from './useAuthStore';

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export type SessionStatus = 'Approved' | 'Not Approved';

export const useApproveSession = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const { accessToken } = useAuthStore();

    const updateSessionStatus = async (sessionId: string, status: SessionStatus) => {
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            await apiClient.put(`/api/Admin/approve-session/${sessionId}`, 
                { status }, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            setIsSuccess(true);
            return true;
        } catch (err: unknown) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Failed to update session data';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        updateSessionStatus,
        isLoading,
        error,
        isSuccess,
        reset: () => {
            setError(null);
            setIsSuccess(false);
        }
    }
}