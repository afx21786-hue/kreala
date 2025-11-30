import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { queryClient, apiRequest } from '../lib/queryClient';
import { useQuery } from '@tanstack/react-query';

interface UserData {
  id: string;
  username: string;
  email: string;
  name: string | null;
  isAdmin: boolean;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: authData, isLoading } = useQuery<{ user: UserData }>({
    queryKey: ['/api/auth/me'],
    retry: false,
    staleTime: Infinity,
  });

  const signOut = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('kef_user');
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    }
  };

  return (
    <AuthContext.Provider value={{ user: authData?.user ?? null, loading: isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
