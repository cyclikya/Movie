const UserMovie = require('../models/user-movie-model.js');
const Review = require('../models/review-model.js');

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
}

module.exports = new UserMovieService();