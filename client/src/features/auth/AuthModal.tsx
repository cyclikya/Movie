import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLoginMutation, useRegistrationMutation } from './authApi';
import { setUser } from './authSlice';
import { useAppDispatch } from '@/app/hooks';
import type { AuthRequest } from './types';

type AuthModalProps = {
    onClose: () => void;
};

function AuthModal({ onClose }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const { register, handleSubmit } = useForm<AuthRequest>();
    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const [registration, { isLoading: regLoading }] = useRegistrationMutation();
    const dispatch = useAppDispatch();

    const isLoading = loginLoading || regLoading;

    const onSubmit = async (data: AuthRequest) => {
        try {
            const action = mode === 'login' ? login : registration;
            const result = await action(data).unwrap();
            localStorage.setItem('token', result.accessToken);
            dispatch(setUser(result.user));
            toast.success(mode === 'login' ? 'Вы вошли в аккаунт' : 'Регистрация прошла успешно');
            onClose();
        } catch (e) {
            const err = e as { data?: { message?: string } };
            toast.error(err.data?.message || 'Что-то пошло не так');
        }
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-80 rounded-xl bg-card p-6"
            >
                <div className="mb-5 flex gap-2">
                    <button
                        onClick={() => setMode('login')}
                        className={`flex-1 rounded-lg py-2 text-sm ${mode === 'login' ? 'bg-accent text-white' : 'bg-elevated text-gray-300'}`}
                    >
                        Вход
                    </button>
                    <button
                        onClick={() => setMode('register')}
                        className={`flex-1 rounded-lg py-2 text-sm ${mode === 'register' ? 'bg-accent text-white' : 'bg-elevated text-gray-300'}`}
                    >
                        Регистрация
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <input
                        {...register('email')}
                        placeholder="email"
                        className="rounded-lg bg-elevated px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                    />
                    <input
                        {...register('password')}
                        type="password"
                        placeholder="пароль"
                        className="rounded-lg bg-elevated px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-lg bg-accent py-2 text-sm text-white disabled:opacity-60"
                    >
                        {isLoading ? 'Подождите…' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthModal;