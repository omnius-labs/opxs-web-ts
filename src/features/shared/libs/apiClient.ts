'use client';

import axios from 'axios';

class ApiClientProvider {
  private apiClient;

  constructor() {
    this.apiClient = axios.create({
      timeout: 30000,
      withCredentials: true // Cookie を送信するために必要
    });

    this.apiClient.interceptors.request.use(
      (config) => {
        const authToken = JSON.parse(localStorage.getItem('auth_token') || 'null');
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken.access_token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // access token が切れた場合、refresh token を使用して再度トークンを取得
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // access token を更新
          try {
            const authToken = JSON.parse(localStorage.getItem('auth_token') || 'null');
            const res = await this.apiClient.post('/api/v1/auth/token/refresh', {
              refresh_token: authToken?.refresh_token
            });

            if (res.status === 200) {
              localStorage.setItem('auth_token', JSON.stringify(res.data));
            } else {
              throw new Error('Refresh token failed');
            }
          } catch (error) {
            console.log(error);
            localStorage.removeItem('auth_token');
            throw error;
          }

          return this.apiClient(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  }

  instance() {
    return this.apiClient;
  }
}

const provider = new ApiClientProvider();

export const apiClient = provider.instance();
