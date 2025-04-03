import apiClient from '@/app/lib/api';
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
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;
