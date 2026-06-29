import { useAppSelector, useAppDispatch } from '@/shared/hooks/hooks';
import { useToast } from '@/shared/ui/toast-context';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Input } from '@/shared/ui/input';
import { logout } from '@/features/auth';
import { NavLink, Link } from 'react-router-dom';
import { AppRoutes } from '@/shared/constants/routes';
import { getAvatarColor } from '@/shared/lib/avatar-color';

type HeaderProps = {
    onLoginClick: VoidFunction;
};

const NAV_LINKS = [
    { label: 'Главная', path: AppRoutes.root },
    { label: 'Поиск', path: AppRoutes.search },
    { label: 'Друзья', path: AppRoutes.friends },
    { label: 'Комнаты', path: AppRoutes.rooms },
];

function Header({ onLoginClick }: HeaderProps) {
    const user = useAppSelector((state) => state.auth.user);
    const { success } = useToast();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        success('Вы вышли');
    };

    return (
        <header className="flex items-center gap-6 px-6 py-3 bg-surface border-b border-white/5">
            <Link to={AppRoutes.root} className="flex items-center gap-2 text-xl font-medium text-brand">
                Movie
            </Link>
            <nav className="flex gap-5 text-sm">
                {NAV_LINKS.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) => (isActive ? 'text-white' : 'text-gray-300')}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
            <div className="ml-auto flex items-center gap-3">
                <Input 
                    placeholder="Поиск…"
                    className="w-40 rounded-lg bg-elevated px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                />
                {user ? (
                    <>
                        <Link to={AppRoutes.profile}>
                            <Avatar>
                                <AvatarFallback
                                    style={{ backgroundColor: getAvatarColor(user.id) }}
                                    className="text-white"
                                >
                                    {user.email?.[0]?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                        <Button variant="secondary" onClick={handleLogout}>
                            Выйти
                        </Button>
                    </>
                ) : (
                    <Button onClick={onLoginClick} variant="default">
                        Войти
                    </Button>
                )}
            </div>
        </header>
    );
}

export default Header;