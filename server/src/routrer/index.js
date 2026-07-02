const Router = require('express').Router;
const userController = require('../controllers/user-controller.js');
const authMiddleware = require('../middlewares/auth-middleware.js');
const movieController = require('../controllers/movie-controller.js');
const userMovieController = require('../controllers/user-movie-controller.js');
const reviewController = require('../controllers/review-controller.js');
const friendController = require('../controllers/friend-controller.js');

const router = new Router();

// User routes
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/search', authMiddleware, userController.searchUsers);

// Movie routes
router.get('/movies/popular', movieController.getPopular);
router.get('/movies/premieres', movieController.getPremieres);
router.get('/movies/search', movieController.search);
router.get('/movies/films', movieController.getPopularFilms);
router.get('/movies/series', movieController.getPopularSeries);
router.get('/movies/filters', movieController.getFilters);
router.get('/movies/discover', movieController.discover);
router.get('/movies/:id/full', movieController.getMoviePage);
router.get('/movies/:id/similars', movieController.getSimilars);
router.get('/movies/:id/staff', movieController.getStaff);
router.get('/movies/:id/videos', movieController.getVideos);
router.get('/movies/:id', movieController.getById);


// User movie list routes
router.get('/my-movies', authMiddleware, userMovieController.getMy);
router.post('/my-movies', authMiddleware, userMovieController.add);
router.delete('/my-movies/:kinopoiskId', authMiddleware, userMovieController.remove);
router.get('/my-movies/full', authMiddleware, userMovieController.getMyFull);

// Review routes
router.get('/reviews/:kinopoiskId', reviewController.getByMovie);
router.post('/reviews', authMiddleware, reviewController.add);
router.delete('/reviews/:kinopoiskId', authMiddleware, reviewController.remove);

// Friend routes
router.get('/friends', authMiddleware, friendController.getFriends);
router.get('/friends/subscribers', authMiddleware, friendController.getSubscribers);
router.get('/friends/subscriptions', authMiddleware, friendController.getSubscriptions);
router.post('/friends/subscribe/:userId', authMiddleware, friendController.subscribe);
router.delete('/friends/subscribe/:userId', authMiddleware, friendController.unsubscribe);
router.post('/friends/accept/:userId', authMiddleware, friendController.accept);
router.post('/friends/reject/:userId', authMiddleware, friendController.reject);
router.delete('/friends/remove/:userId', authMiddleware, friendController.removeFriend);

// User stats route
router.get('/profile/stats', authMiddleware, userController.getStats);

module.exports = router