import { useAuthStore } from '@/store';
import { LoginResponse, RegisterCustomerResponse, RegisterVendorForm } from '@/types/auth';
import { api, setAuthToken, showError, showSuccess } from './api';

export class AuthService {
  static validatePassword(password: string): {
    isValid: boolean;
    // errors: string[];
    hasMinLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  } {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar,
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
    };
  }

  static async login(credentials: { email: string; password: string }) {
    const { setUser, setToken, setLoading } = useAuthStore.getState();

    setLoading(true);

    try {
      const response = await api.post('/users/login', credentials);

      if (response.ok && response.data) {
        const { user, token, message } = (response.data as LoginResponse).data;

        // Update store
        setUser(user);
        setToken(token);
        setAuthToken(token);

        showSuccess('Login successful!');
        return { success: true, data: response.data as LoginResponse };
      } else {
        showError((response as any)?.data.error || 'Login failed');

        return { success: false, error: (response as LoginResponse)?.data.message };
      }
    } catch (error: any) {
      showError('Network error. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  static async register(userData: any) {
    const { setLoading } = useAuthStore.getState();

    setLoading(true);

    try {
      const response = await api.post('/users/register', userData);

      if (response.ok) {
        showSuccess('Registration successful!');
        return { success: true, data: response.data };
      } else {
        showError(response.data?.error || 'Registration failed');
        return { success: false, error: response.data?.message };
      }
    } catch (error: any) {
      showError('Network error. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  static async logout() {
    const { logout } = useAuthStore.getState();

    try {
      await api.post('/logout');
      logout();
      setAuthToken(null);
      showSuccess('Logged out successfully');
    } catch (error) {
      // Even if API call fails, clear local state
      logout();
      setAuthToken(null);
    }
  }

  static async forgotPassword(email: string) {
    try {
      const response = await api.post('/forgot-password', { email });

      if (response.ok) {
        showSuccess('Reset link sent to your email');
        return { success: true };
      } else {
        showError(response.data?.error || 'Failed to send reset link');
        return { success: false, error: response.data?.message };
      }
    } catch (error: any) {
      showError('Network error. Please try again.');
      return { success: false, error: error.message };
    }
  }

  static async resetPassword(token: string, password: string) {
    try {
      const response = await api.post('/reset-password', { token, password });

      if (response.ok) {
        showSuccess('Password reset successful');
        return { success: true };
      } else {
        showError(response.data?.error || 'Password reset failed');
        return { success: false, error: response.data?.message };
      }
    } catch (error: any) {
      showError('Network error. Please try again.');
      return { success: false, error: error.message };
    }
  }

  static async registerVendor(userData: RegisterVendorForm) {
    const { setLoading } = useAuthStore.getState();

    setLoading(true);

    try {
      const response = await api.post('/users', userData);
      console.log('Register response:', response.data);

      if (response.ok) {
        showSuccess('Registration successful!');
        return { success: true, data: response.data as RegisterCustomerResponse };
      } else {
        showError(response.data?.error || 'Registration failed');
        return { success: false, error: response.data?.error };
      }
    } catch (error: any) {
      showError('Network error. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  static async verifyEmail(email: string, otp: string) {
    const { setLoading } = useAuthStore.getState();

    setLoading(true);

    try {
      const response = await api.post('/users/verify-email', {
        email,
        otp,
      });

      if (response.ok) {
        showSuccess('Email verified successfully!');
        return { success: true, data: response.data };
      } else {
        showError(response.data?.error || 'Verification failed');
        return { success: false, error: response.data?.message };
      }
    } catch (error: any) {
      showError('Network error. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  static async resendEmailVerification(email: string) {
    try {
      const response = await api.post('/users/resend-verification', { email });

      if (response.ok) {
        showSuccess('Verification code sent successfully');
        return { success: true, data: response.data };
      } else {
        showError(response.data?.error || 'Failed to resend verification code');
        return { success: false, error: response.data?.message };
      }
    } catch (error: any) {
      showError('Network error. Please try again.');
      return { success: false, error: error.message };
    }
  }
}
