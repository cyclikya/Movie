export type User = {
    id: number;
    email: string;
};

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
};

export type AuthRequest = {
    email: string;
    password: string;
};