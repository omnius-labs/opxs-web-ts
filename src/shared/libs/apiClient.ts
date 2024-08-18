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
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
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
          await this.refreshToken();
          return this.apiClient(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  }

  // access token が期限切れになる前に、refresh token を使用して更新
  private async refreshToken() {
    try {
      const res = await this.apiClient.post('/api/v1/auth/token/refresh', {
        refresh_token: localStorage.getItem('refreshToken')
      });

      if (res.status === 200) {
        localStorage.setItem('accessToken', res.data.access_token);
      }
    } catch (error) {
      console.log(error);
      throw new Error('Refresh token failed');
    }
  }

  instance() {
    return this.apiClient;
  }
}

const provider = new ApiClientProvider();
export const apiClient = provider.instance();
