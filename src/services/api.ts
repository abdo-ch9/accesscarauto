const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://accesscarauto-backend.vercel.app/api' 
    : 'http://localhost:5000/api');

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: string;
  isEmailVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }

    return response.data!;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data) {
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }

    return response.data!;
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.request<{ user: User }>('/auth/me');
    return response.data!.user;
  }

  async refreshToken(): Promise<string> {
    const response = await this.request<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });
    return response.data!.token;
  }

  // User profile methods
  async updateProfile(profileData: Partial<User>): Promise<User> {
    const response = await this.request<{ user: User }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });

    if (response.success && response.data) {
      // Update stored user data
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }

    return response.data!.user;
  }

  async updateAvatar(avatarUrl: string): Promise<User> {
    const response = await this.request<{ user: User }>('/users/avatar', {
      method: 'PUT',
      body: JSON.stringify({ avatar: avatarUrl }),
    });

    if (response.success && response.data) {
      // Update stored user data
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }

    return response.data!.user;
  }

  async deleteAccount(): Promise<void> {
    await this.request('/users/account', {
      method: 'DELETE',
    });
    
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string; timestamp: string }> {
    const response = await this.request<{ status: string; message: string; timestamp: string }>('/health');
    return response.data!;
  }
}

// Create and export API instance
export const api = new ApiService(API_BASE_URL);

// Export types for use in components
export type { User, LoginData, RegisterData, AuthResponse, ApiResponse };
