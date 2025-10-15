'use client';

import { createContext, useContext, ReactNode } from 'react';
import Toast, { useToast } from '@/components/Toast';

interface ToastContextType {
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, success, error, warning, info } = useToast();

  return (
    <ToastContext.Provider value={{ success, error, warning, info }}>
      {children}
      {/* Renderizar toasts */}
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}
