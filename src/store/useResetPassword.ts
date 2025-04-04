'use client';

import { useState } from "react";
import apiClient from "@/app/lib/api";
import { useSearchParams } from "next/navigation";
import { AxiosError } from "axios"; 

interface ResetPasswordParams {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
}

// Define the expected error response shape
interface ApiErrorResponse {
    message?: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
}

export const useResetPassword = (initialParams?: { email?: string; token?: string}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const searchParams = useSearchParams();

    const getParams = () => {
        return initialParams || {
            email: searchParams.get('email') || undefined,
            token: searchParams.get('token') || undefined
        }
    }

    const resetPassword = async (newPassword: string, confirmPassword: string) => {
        const { email, token } = getParams()
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            if(!email || !token) {
                throw new Error('Missing email or token in URL');
            }

            const response = await apiClient.post<ResetPasswordParams>('/api/Auth/reset-password', {
                email,
                token,
                newPassword,
                confirmPassword
            });

            setIsSuccess(true);
            return response;
        } catch (err: unknown) {
            // Properly type the error
            const axiosError = err as AxiosError<ApiErrorResponse>;
            const errorMessage = axiosError.response?.data?.message || 
                               axiosError.message || 
                               'Failed to reset password';
            setError(errorMessage);
            throw new Error(errorMessage); // Throw a new Error with the message
        } finally {
            setIsLoading(false);
        }
    };

    return {
        resetPassword,
        isLoading,
        error,
        isSuccess,
    };
};