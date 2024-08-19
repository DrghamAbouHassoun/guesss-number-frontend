"use client";
import { handleLogout } from '@/lib/features/authSlice';
import { useAppDispatch } from '@/lib/hooks';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(handleLogout())
    router.push("/login");
    return;
  }

  return (
    <Button onClick={handleClick}>Logout</Button>
  )
}

export default LogoutButton