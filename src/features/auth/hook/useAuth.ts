"use client";

import { useState, useEffect, useCallback } from "react";
import { AuthState, LoginCredentials, RegisterData, User } from "../types/auth.type";

const AUTH_STORAGE_KEY = "lotion_auth_user";
const AUTH_TOKEN_KEY = "lotion_auth_token";
const USERS_STORAGE_KEY = "lotion_registered_users";

// Safe storage helpers
const getSessionStorage = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(key);
};

const setSessionStorage = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(key, value);
};

const removeSessionStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(key);
};

const getLocalStorage = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
};

const setLocalStorage = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
};

const removeLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    try {
      const storedUser = getSessionStorage(AUTH_STORAGE_KEY);
      const storedToken = getSessionStorage(AUTH_TOKEN_KEY);

      if (storedUser && storedToken) {
        const user = JSON.parse(storedUser);
        setAuthState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
        }));
      }
    } catch (error) {
      console.error("Failed to load auth data from session storage:", error);
      removeSessionStorage(AUTH_STORAGE_KEY);
      removeSessionStorage(AUTH_TOKEN_KEY);
    }
  }, []);

  useEffect(() => {
    if (authState.error) {
      const timer = setTimeout(() => {
        setAuthState(prev => ({ ...prev, error: null }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [authState.error]);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const registeredUsers = JSON.parse(getLocalStorage(USERS_STORAGE_KEY) || "[]");

      if (credentials.email === "demo@lotion.com" && credentials.password === "demo123") {
        const mockUser: User = {
          id: "demo",
          name: "Demo User",
          email: credentials.email,
          avatar: undefined,
          createdAt: new Date().toISOString(),
        };

        const mockToken = "mock_jwt_token_" + Date.now();

        setSessionStorage(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
        setSessionStorage(AUTH_TOKEN_KEY, mockToken);

        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return true;
      }

      const user = registeredUsers.find(
        (u: any) => u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;

        const mockToken = "mock_jwt_token_" + Date.now();

        setSessionStorage(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));
        setSessionStorage(AUTH_TOKEN_KEY, mockToken);

        setAuthState({
          user: userWithoutPassword,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return true;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (!data.terms) {
        throw new Error("You must agree to the terms and conditions");
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      const existingUsers = JSON.parse(getLocalStorage(USERS_STORAGE_KEY) || "[]");
      const userExists = existingUsers.some((user: User) => user.email === data.email);

      if (userExists) {
        throw new Error("User with this email already exists");
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        avatar: undefined,
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...existingUsers, { ...newUser, password: data.password }];
      setLocalStorage(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

      const mockToken = "mock_jwt_token_" + Date.now();

      setSessionStorage(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      setSessionStorage(AUTH_TOKEN_KEY, mockToken);

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    removeSessionStorage(AUTH_STORAGE_KEY);
    removeSessionStorage(AUTH_TOKEN_KEY);

    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setAuthState(prev => {
      if (!prev.user) return prev;

      const updatedUser = { ...prev.user, ...updates };

      setSessionStorage(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));

      return {
        ...prev,
        user: updatedUser,
      };
    });
  }, []);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  const getToken = useCallback(() => {
    return getSessionStorage(AUTH_TOKEN_KEY);
  }, []);

  const getRegisteredUsers = useCallback(() => {
    try {
      const users = JSON.parse(getLocalStorage(USERS_STORAGE_KEY) || "[]");
      return users.map(({ password, ...user }: any) => user);
    } catch {
      return [];
    }
  }, []);

  const clearAllUsers = useCallback(() => {
    removeLocalStorage(USERS_STORAGE_KEY);
    logout();
  }, [logout]);

  const isAuthenticated = authState.isAuthenticated && authState.user !== null;

  return {
    user: authState.user,
    isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,

    // Actions
    login,
    register,
    logout,
    updateUser,
    clearError,

    // Utilities
    getToken,
    getRegisteredUsers,
    clearAllUsers,
  };
}