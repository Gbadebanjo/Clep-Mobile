import { useAuthStore } from '@/store';
import { AuthService } from '@/services/auth.service';

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    setUser,
    setToken,
    logout: logoutStore,
  } = useAuthStore();

  const login = async (credentials: { email: string; password: string }) => {
    return await AuthService.login(credentials);
  };

  const register = async (userData: any) => {
    return await AuthService.register(userData);
  };

  const logout = async () => {
    await AuthService.logout();
  };

  const forgotPassword = async (email: string) => {
    return await AuthService.forgotPassword(email);
  };

  const resetPassword = async (token: string, password: string) => {
    return await AuthService.resetPassword(token, password);
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    setUser,
    setToken,
  };
};