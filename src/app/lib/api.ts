import useAuthStore from '@/store/useAuthHook';
import instance from './axiosInstance';
import { AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

instance.interceptors.request.use(
    (config) => {
        const { accessToken } = useAuthStore.getState();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response token interceptor
instance.interceptors.response.use(
    (response) => response, 
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean; };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await useAuthStore.getState().refreshAccessToken();

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                } else {
                    originalRequest.headers = {
                        Authorization: `Bearer ${newAccessToken}`
                    };
                }

                return instance(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token error:", refreshError)
                useAuthStore.getState().setPendingRequest(originalRequest);
                window.dispatchEvent(new CustomEvent('showSessionExpired'));
                return Promise.reject(new Error('SESSION_EXPIRED'));
            }
        }

        return Promise.reject(error);
    }
)


// export interface ApiResponse<T> {
//     statusCode: number;
//     statusMessage: string;
//     data: T;
// }

interface ApiErrorResponse {
    message?: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
}


const request = async <T, D = unknown>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "FETCH",
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
) : Promise<T> => {
    try {
        const isFormData = data instanceof FormData;

        const response: AxiosResponse<T> = await instance({
            method, 
            url,
            data,
            ...config,
            headers: {
                ...config?.headers,
                ...(isFormData ? {} : {"Content-Type": "application/json"}),
            }
        });
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        console.error("API Error:", axiosError.response?.data || axiosError.message);
        throw axiosError.response?.data || new Error("An error occurred");
    }
};

const apiClient = {
    get: <T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) => request<T, D>("GET", url, undefined, config),
    post: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) => request<T, D>("POST", url, data, config),
    put: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) => request<T, D>("PUT", url, data, config),
    delete: <T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) => request<T, D>("DELETE", url, undefined, config),
    fetch: <T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) => request<T, D>("FETCH", url, undefined, config),
};

export default apiClient;