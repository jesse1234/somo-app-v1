import useAuthStore from '@/store/useAuthStore';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api-somo.dataposit.co.ke",
    headers: {
        "Content-Type": "application/json"
    },
});


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
        const response: AxiosResponse<T> = await api({
            method, 
            url,
            data,
            ...config,
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