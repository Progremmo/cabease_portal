import apiClient from './api.client';

export interface LoginRequest {
  loginType: 'PASSWORD' | 'OTP';
  email: string;
  password?: string;
  otp?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    // Optionally call backend logout if it exists
    // await apiClient.post('/auth/logout');
  },
};
