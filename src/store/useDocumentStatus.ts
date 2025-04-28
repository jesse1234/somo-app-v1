// 'use client';

import { useState } from 'react';
import apiClient from '@/app/lib/api';
import { AxiosError } from 'axios';
import useAuthStore from './useAuthHook';

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export type DocumentStatus = 'NotSubmitted' | 'Pending' | 'Approved' | 'Rejected' | 'Expired';

export const useDocumentApproval = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { accessToken } = useAuthStore();

  const updateDocumentStatus = async (documentId: string, status: DocumentStatus) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await apiClient.put(`/api/Admin/UpdateDocumentStatus/${documentId}`,
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
        const errorMessage = axiosError.response?.data?.message || 
                          axiosError.message || 
                          'Failed to update document status';
        setError(errorMessage);
        throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

    return {
      updateDocumentStatus,
      isLoading,
      error,
      isSuccess,
      reset: () => {
        setError(null);
        setIsSuccess(false);
    }
  }
}