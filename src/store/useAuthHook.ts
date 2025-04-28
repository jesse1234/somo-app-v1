import apiClient from '@/app/lib/api';
import { AxiosRequestConfig } from 'axios';
// import { axiosInstance } from '@/app/lib/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    name: string;
    role: string; 
}

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (accessToken: string, refreshToken: string, user: User) => void;
    loginUser: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshAccessToken: () => Promise<string>;
    showSessionExpired: boolean;
    setShowSessionExpired: (show: boolean) => void;
    pendingRequest: AxiosRequestConfig | null;
    setPendingRequest: (request: AxiosRequestConfig | null) => void;
} 

const useAuthStore  = create<AuthState>() (
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,

            login: (accessToken: string, refreshToken: string, user: User) => {
                set({
                    accessToken, 
                    refreshToken,
                    user,
                    isAuthenticated: true
                });
            },

            loginUser: async (email: string, password: string) => {
                try {
                    const response = await apiClient.post<{
                        data: { accessToken: string; refreshToken: string; user: User };
                    }>('/api/Auth/login', { email, password });

                    const { accessToken, refreshToken, user } = response.data;
                    
                    set({
                        accessToken,
                        refreshToken,
                        user,
                        isAuthenticated: true
                    });
                } catch (error) {
                    console.error('Login failed:', error);
                    throw error;
                }

                
            },

            logout: async () => {
                try {
                    const token = get().accessToken;

                    set({
                        accessToken: null, 
                        refreshToken: null,
                        user: null,
                        isAuthenticated: false,
                    });

                    if (token) {
                        await apiClient.post('/api/Auth/logout', null, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                    }
                } catch (error) {
                    console.error('Logout failed:', error);

                    set({
                        accessToken: null, 
                        refreshToken: null,
                        user: null,
                        isAuthenticated: false,
                    });
                }
            },

            showSessionExpired: false,
            pendingRequest: null,

            setShowSessionExpired: (show) => set({ showSessionExpired: show}),
            setPendingRequest: (request) => set({ pendingRequest: request}),

            refreshAccessToken: async () => {
                try {
                    const currentAccessToken = get().accessToken;
                    const currentRefreshToken = get().refreshToken;

                    if (!currentRefreshToken || !currentAccessToken) {
                        throw new Error('No tokens available');
                    }

                    const response = await apiClient.post<{
                        data: {
                            accessToken: string;
                            refreshToken: string;
                        }
                    }>('/api/Auth/refresh-token', {
                        accessToken: currentAccessToken,
                        refreshToken: currentRefreshToken
                    });

                    const { accessToken, refreshToken } = response.data;

                    set({
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        showSessionExpired: false,
                    });

                    return accessToken;
                } catch (error) {
                    console.error('Token refresh failed:', error);
                    await get().logout();
                    throw error;
                }
            }
        }),
        {
            name: 'auth-storage',
        }
    )
);

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 const newAccessToken = await useAuthStore.getState().refreshAccessToken();

//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//                 return axiosInstance(originalRequest);
//             } catch (refreshError) {
//                 await useAuthStore.getState().logout();
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// )

export default useAuthStore;
