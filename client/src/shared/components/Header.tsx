import { useAppSelector, useAppDispatch } from '@/shared/hooks/hooks';
import { useToast } from '@/shared/ui/toast-context';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Input } from '@/shared/ui/input';
import { logout } from '@/features/auth';

type HeaderProps = {
    onLoginClick: VoidFunction;
};

const NAV_LINKS = ['Главная', 'Поиск', 'Друзья', 'Комнаты'];

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
            <div className="flex items-center gap-2 text-xl font-medium text-brand">
                Movie
            </div>
            <nav className="flex gap-5 text-sm text-gray-300">
                {NAV_LINKS.map((link) => (
                    <a key={link} className="text-white">
                        {link}
                    </a>
                ))}
            </nav>
            <div className="ml-auto flex items-center gap-3">
                <Input 
                    placeholder="Поиск…"
                    className="w-40 rounded-lg bg-elevated px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                />
                {user ? (
                    <>
                        <Avatar>
                            <AvatarFallback className="bg-[#534AB7] text-white">
                                {user.email?.[0]?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
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