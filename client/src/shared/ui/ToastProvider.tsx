import type { ReactNode } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ToastContext } from '../ui/toast-context';
import type { ToastContextType } from '../ui/toast-context';

export function ToastProvider({ children }: { children: ReactNode }) {
    const value: ToastContextType = {
        success: (message) => toast.success(message),
        error: (message) => toast.error(message),
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#1C1F26',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.08)',
                    },
                }}
            />
        </ToastContext.Provider>
    );
}