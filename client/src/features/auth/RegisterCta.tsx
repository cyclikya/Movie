function RegisterCta() {
    return (
        <section className="mt-6 flex flex-col items-center gap-2.5 rounded-xl border border-white/5 bg-card p-6 text-center">
            <p className="text-sm text-white">
                Зарегистрируйся, чтобы получать персональные рекомендации и отзывы друзей
            </p>
            <button className="rounded-lg bg-accent px-4 py-2 text-sm text-white">
                Зарегистрироваться
            </button>
        </section>
    );
}

export default RegisterCta;