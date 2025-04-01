import React from 'react';
import { Sidebar } from '../components/ui/Sidebar';
import ErrorBoundary from '../components/error-boundary';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100 pt-24">
          {children}
        </div>
      </div>
    </ErrorBoundary>
  );
}
