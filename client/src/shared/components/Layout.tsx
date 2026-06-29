import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import AuthModal from '@/features/auth/AuthModal';

function Layout() {
    const [authOpen, setAuthOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bg text-white">
            <Header onLoginClick={() => setAuthOpen(true)} />
                <main className="mx-auto max-w-7xl px-6 py-5">
                    <Outlet />
                </main>
            <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
        </div>
    );
}

export default Layout;