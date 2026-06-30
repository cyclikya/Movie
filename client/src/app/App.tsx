import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from '@/shared/ui/ToastProvider';
import { AppRoutes } from '@/shared/constants/routes';
import Layout from '@/shared/components/Layout';
import HomePage from '@/pages/home/page';
import SearchPage from '@/pages/search/page';
import FriendsPage from '@/pages/friends/page';
import ProfilePage from '@/pages/profile/page';
import RoomsPage from '@/pages/rooms/page';
import MoviePage from '@/pages/movie/page';

function App() {
    return (
        <ToastProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path={AppRoutes.root} element={<HomePage />} />
                        <Route path={AppRoutes.search} element={<SearchPage />} />
                        <Route path={AppRoutes.friends} element={<FriendsPage />} />
                        <Route path={AppRoutes.profile} element={<ProfilePage />} />
                        <Route path={AppRoutes.rooms} element={<RoomsPage />} />
                        <Route path={AppRoutes.movie} element={<MoviePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ToastProvider>
    );
}

export default App;