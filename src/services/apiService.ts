import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Create an axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true, 
});

// Get CSRF token from cookie
const getCsrfTokenFromCookie = (): string => {
  const cookies = document.cookie.split('; ');
  const csrfCookie = cookies.find((row) => row.startsWith('XSRF-TOKEN='));

  if (!csrfCookie) {
    console.warn('XSRF-TOKEN cookie not found');
    return '';
  }

  return csrfCookie.split('=')[1] || '';
};

// Fetch a fresh CSRF token
const getCsrfToken = async (): Promise<void> => {
  try {
    await apiClient.get('/auth/csrf-token');
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
};

// Generic API request function
const apiRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: unknown,
  params?: Record<string, string>
): Promise<T> => {
  try {
    // Fetch CSRF token before modifying state
    if (['post', 'put', 'delete'].includes(method)) {
      await getCsrfToken();
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      headers: {
        'X-XSRF-TOKEN': getCsrfTokenFromCookie(),
      },
    };

    const response: AxiosResponse<T> = await apiClient(config);
    return response.data;
  } catch (error: any) {
    console.error('API Request Error:', error);
    throw error.response ? error.response.data : error;
  }
};

// API wrapper object
export const api = {
  get: <T>(url: string, params?: Record<string, string>) =>
    apiRequest<T>('get', url, undefined, params),
  post: <T>(url: string, data?: unknown) => apiRequest<T>('post', url, data),
  put: <T>(url: string, data?: unknown) => apiRequest<T>('put', url, data),
  delete: <T>(url: string) => apiRequest<T>('delete', url),
};
