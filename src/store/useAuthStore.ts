import apiClient from '@/app/lib/apiClient';
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
    logout: () => Promise<void>;
} 

const useAuthStore  = create<AuthState>() (
    persist(
        (set) => ({
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

            logout: async () => {
                try {
                    await apiClient.post('/api/Auth/logout');
                } catch (error) {
                    console.error('Logout failed:', error);
                } finally {
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