import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import AuthModal from '@/features/auth/AuthModal';

export type LayoutContext = { openAuth: () => void };

function Layout() {
    const [authOpen, setAuthOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bg text-white">
            <Header onLoginClick={() => setAuthOpen(true)} />
            <main className="mx-auto max-w-7xl px-6 py-5">
                <Outlet context={{ openAuth: () => setAuthOpen(true) } satisfies LayoutContext} />
            </main>
            <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
        </div>
    );
}

export default Layout;