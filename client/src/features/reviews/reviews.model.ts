export type Review = {
    id: number;
    userId: number;
    email: string | null;
    rating: number;
    text: string;
};