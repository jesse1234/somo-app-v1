'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthHook';
import instance from '@/app/lib/axiosInstance';

export function SessionExpiredModal() {
  const router = useRouter();
  const {
    showSessionExpired,
    setShowSessionExpired,
    pendingRequest,
    setPendingRequest,
    refreshAccessToken,
    logout
  } = useAuthStore();

  const handleContinueSession = async () => {
    try {
      const newToken = await refreshAccessToken();
      
      if (pendingRequest && pendingRequest.headers) {
        pendingRequest.headers.Authorization = `Bearer ${newToken}`;
        // Retry the original request
        await instance(pendingRequest);
      }
      
      setShowSessionExpired(false);
      setPendingRequest(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Session continuation failed:", error);
      } else {
        console.error("Unknown error occurred during session continuation");
      }
      await logout();
      router.push('/');
    }
  };

  const handleLogout = async () => {
    await logout();
    setShowSessionExpired(false);
    setPendingRequest(null);
    router.push('/login');
  };

  useEffect(() => {
    const handleShowModal = () => setShowSessionExpired(true);
    
    window.addEventListener('showSessionExpired', handleShowModal);
    return () => window.removeEventListener('showSessionExpired', handleShowModal);
  }, [setShowSessionExpired]);

  if (!showSessionExpired) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999]">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Session Expired</h2>
        <p className="mb-6">Your session has expired. Would you like to continue?</p>
        
        <div className="flex gap-4">
          <button
            onClick={handleContinueSession}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Continue Session
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}