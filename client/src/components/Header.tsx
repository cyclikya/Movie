import toast from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { logout } from '@/features/auth/authSlice';

type HeaderProps = {
    onLoginClick: () => void;
};

function Header({ onLoginClick }: HeaderProps) {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    return (
        <header className="flex items-center gap-6 px-6 py-3 bg-surface border-b border-white/5">
            <div className="flex items-center gap-2 text-xl font-medium text-accent">
                Movie
            </div>
            <nav className="flex gap-5 text-sm text-gray-300">
                <a className="text-white">Главная</a>
                <a>Поиск</a>
                <a>Друзья</a>
                <a>Комнаты</a>
            </nav>
            <div className="ml-auto flex items-center gap-3">
                <input
                    placeholder="Поиск…"
                    className="w-40 rounded-lg bg-elevated px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                />
                {user ? (
                    <>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#534AB7] text-sm">
                            {user.email[0].toUpperCase()}
                        </div>
                        <button
                            onClick={() => { dispatch(logout()); toast.success('Вы вышли'); }}
                            className="rounded-lg bg-elevated px-4 py-2 text-sm text-gray-200"
                        >
                            Выйти
                        </button>
                    </>
                ) : (
                    <button onClick={onLoginClick} className="rounded-lg bg-accent px-4 py-2 text-sm text-white">
                        Войти
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;