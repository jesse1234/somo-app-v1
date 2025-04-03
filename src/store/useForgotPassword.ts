'use client';

import { useState } from 'react';
import apiClient from '@/app/lib/apiClient';
import { AxiosError } from 'axios';

interface ApiErrorResponse {
    message?: string;
    // statusCode?: number;
    // error?: string;
  }

export const useForgotPassword = () => {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (email: string) => {
    setStatus('loading');
    setError(null);

    try {
      await apiClient.post('/api/Auth/forgot-password', { email });
      setStatus('success');
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || "Failed to send password reset link. Please try again."

      setStatus('error');
      setError(errorMessage);
      throw new Error(errorMessage); 
    }
  };

  const resetState = () => {
    setStatus('idle');
    setError(null);
  };

  return {
    resetPassword,
    status,
    error,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    resetState,
  };
};