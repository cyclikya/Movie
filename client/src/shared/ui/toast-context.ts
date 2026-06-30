import { createContext, useContext } from 'react';

export type ToastContextType = {
    success: (message: string) => void;
    error: (message: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast должен использоваться внутри ToastProvider');
    }
    return context;
}