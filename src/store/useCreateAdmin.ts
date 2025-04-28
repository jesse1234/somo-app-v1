'use client';

import { useState } from 'react';
import apiClient from '@/app/lib/api';
import { AxiosError } from 'axios';
import useAuthStore from './useAuthHook';

interface CreateAdminParams {
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string;
    phoneNumber: string;
}

interface ApiErrorResponse {
    message?: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
}

export const useCreateAdmin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const { accessToken } = useAuthStore()

    const createAdmin = async (adminData: CreateAdminParams) => {
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            if (adminData.password !== adminData.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const response = await apiClient.post('/api/Admin/register-admin', adminData, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            setIsSuccess(true);
            return response;
        } catch (err: unknown) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            if (axiosError.response?.status === 409) {
                setError("User with this email already exists");
            } else {
                const errorMessage = axiosError.response?.data?.message || 'Failed to create admin';
                setError(errorMessage);
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createAdmin,
        isLoading,
        error,
        isSuccess,
        reset: () => {
            setError(null);
            setIsSuccess(false);
        }
    }
}