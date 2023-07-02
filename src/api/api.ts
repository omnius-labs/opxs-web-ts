'use client';

import axios from 'axios';
import Cookies from 'js-cookie';

class ApiClientProvider {
  private http;

  constructor() {
    this.http = axios.create({
      timeout: 30000,
      withCredentials: true // Cookie を送信するために必要
    });

    this.http.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // access token が切れた場合、refresh token を使用して再度トークンを取得
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // access token を更新
          await this.refreshToken();
          return this.http(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  }

  // access token が期限切れになる前に、refresh token を使用して更新
  private async refreshToken() {
    try {
      const response = await this.http.post('/refresh-token', {
        refreshToken: Cookies.get('refreshToken')
      });

      if (response.status === 200) {
        Cookies.set('accessToken', response.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict'
        });
        this.http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
      }
    } catch (error) {
      throw new Error('Refresh token failed');
    }
  }

  instance() {
    return this.http;
  }
}

const provider = new ApiClientProvider();
export default provider.instance();
