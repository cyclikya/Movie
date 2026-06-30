import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth/auth.api';
import authReducer from '@/features/auth/auth.slice';
import { moviesApi } from '@/features/movies/movies.api';
import { userMoviesApi } from '@/features/movies/userMovies.api';
import { reviewsApi } from '@/features/reviews/reviews.api';
import { friendsApi } from '@/features/friends/friends.api';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [moviesApi.reducerPath]: moviesApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer,
        [friendsApi.reducerPath]: friendsApi.reducer,
        [userMoviesApi.reducerPath]: userMoviesApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            moviesApi.middleware,
            userMoviesApi.middleware,
            reviewsApi.middleware,
            friendsApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;