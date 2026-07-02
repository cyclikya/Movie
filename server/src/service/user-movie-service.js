const UserMovie = require('../models/user-movie-model.js');
const Review = require('../models/review-model.js');
const movieService = require('./movie-service.js');

const ALLOWED_STATUSES = ['planned', 'watching', 'watched'];

class UserMovieService {
    async addToList(userId, kinopoiskId, status) {
        if (!ALLOWED_STATUSES.includes(status)) {
            throw new Error('Недопустимый статус списка');
        }
        const existing = await UserMovie.findOne({ where: { userId, kinopoiskId } });
        if (existing) {
            existing.status = status;
            return existing.save();
        }
        return UserMovie.create({ userId, kinopoiskId, status });
    }

    async removeFromList(userId, kinopoiskId) {
        return UserMovie.destroy({ where: { userId, kinopoiskId } });
    }

    async getMyList(userId, status) {
        const where = { userId };
        if (status) where.status = status;
        const items = await UserMovie.findAll({ where });
        const reviews = await Review.findAll({ where: { userId } });
        return items.map((i) => {
            const review = reviews.find((r) => r.kinopoiskId === i.kinopoiskId);
            return {
                kinopoiskId: i.kinopoiskId,
                status: i.status,
                rating: review ? review.rating : null,
            };
        });
    }
    
    async getMyListFull(userId, status) {
        const list = await this.getMyList(userId, status);
        const movies = await Promise.all(
            list.map(async (item) => {
                const details = await movieService.getById(item.kinopoiskId).catch(() => null);
                if (!details) return null;
                return {
                    id: details.id,
                    title: details.title,
                    year: details.year,
                    rating: details.ratingKp,
                    poster: details.poster,
                    cover: details.cover,
                    status: item.status,
                    userRating: item.rating,
                };
            }),
        );
        return movies.filter(Boolean);
    }
}

module.exports = new UserMovieService();