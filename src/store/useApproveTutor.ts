'use client';

import { useState } from 'react';
import apiClient from '@/app/lib/api';
import { AxiosError } from 'axios';
import useAuthStore from './useAuthStore';

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export const useApproveTutor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { accessToken } = useAuthStore();

  const approveTutor = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await apiClient.post(`/api/Admin/ApproveTutor/${userId}`,
        {},
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
      const errorMessage = axiosError.response?.data?.message || 
                         axiosError.message || 
                         'Failed to approve tutor';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    approveTutor,
    isLoading,
    error,
    isSuccess,
    reset: () => {
      setError(null);
      setIsSuccess(false);
    }
  };
};