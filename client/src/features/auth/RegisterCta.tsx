import { Button } from '@/shared/ui/button';

function RegisterCta() {
    return (
        <section className="mt-6 flex flex-col items-center gap-2.5 rounded-xl border border-white/5 bg-panel p-6 text-center">
            <p className="text-sm text-white">
                Зарегистрируйся, чтобы получать персональные рекомендации и отзывы друзей
            </p>
            <Button >
                Зарегистрироваться
            </Button>
        </section>
    );
}

export default RegisterCta;