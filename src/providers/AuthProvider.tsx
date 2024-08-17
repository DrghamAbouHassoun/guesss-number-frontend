"use client";
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'

interface AuthProviderProps {
  children: React.ReactNode;
}

const protectedRoutes = ["/game"];
const publicRoutes = ["/login", "/register", "/"];

const AuthProvider = ({ children }: AuthProviderProps): ReactNode => {
  const router = useRouter();
  const path = usePathname();
  const auth = useAppSelector((state: RootState) => state.auth);

  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute && auth.status !== "authenticated") {
    router.push("/login");
    return;
  }

  if (
    isPublicRoute &&
    auth.status !== "authenticated" &&
    path.startsWith('/dashboard')
  ) {
    router.push('/dashboard');
    return;
  }

  return <>{children}</>;
}

export default AuthProvider