import { useState } from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import AuthModal from '@/features/auth/AuthModal';

type LayoutProps = {
    children: ReactNode;
};

function Layout({ children }: LayoutProps) {
    const [authOpen, setAuthOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bg text-white">
            <Header onLoginClick={() => setAuthOpen(true)} />
            <main className="px-6 py-5">{children}</main>
            {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
        </div>
    );
}

export default Layout;