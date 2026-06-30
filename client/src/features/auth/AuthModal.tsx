import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation, useRegistrationMutation } from './auth.api';
import { setUser } from './auth.slice';
import { useToast } from '@/shared/ui/toast-context';
import { useAppDispatch } from '@/shared/hooks/hooks';
import type { AuthRequest } from './auth.model';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';
import FormInput from '@/shared/components/FormInput';

type AuthModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

function AuthModal({ open, onOpenChange }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const { control, handleSubmit } = useForm<AuthRequest>();
    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const [registration, { isLoading: regLoading }] = useRegistrationMutation();
    const { success, error } = useToast();
    const dispatch = useAppDispatch();

    const showLogin = () => setMode('login');
    const showRegister = () => setMode('register');

    const isLoading = loginLoading || regLoading;

    const onSubmit = async (data: AuthRequest) => {
        try {
            const action = mode === 'login' ? login : registration;
            const result = await action(data).unwrap();
            localStorage.setItem('token', result.accessToken);
            dispatch(setUser(result.user));
            success(mode === 'login' ? 'Вы вошли в аккаунт' : 'Регистрация прошла успешно');
            onOpenChange(false);
        } catch (e) {
            const err = e as { data?: { message?: string } };
            error(err.data?.message || 'Что-то пошло не так');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle className="sr-only">Вход или регистрация</DialogTitle>

                <div className="flex gap-2 pt-5">
                    <Button
                        variant={mode === 'login' ? 'default' : 'secondary'}
                        onClick={showLogin}
                        className="flex-1"
                    >
                        Вход
                    </Button>
                    <Button
                        variant={mode === 'login' ? 'secondary' : 'default'}
                        onClick={showRegister}
                        className="flex-1"
                    >
                        Регистрация
                    </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <FormInput name="email" control={control} placeholder="email" />
                        <FormInput name="password" control={control} type="password" placeholder="пароль" />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Подождите…' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AuthModal;