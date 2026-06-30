const Review = require('../models/review-model.js');
const UserModel = require('../models/user-model.js');
const userMovieService = require('./user-movie-service.js');

class ReviewService {
    async addReview(userId, kinopoiskId, rating, text) {
        if (rating < 1 || rating > 10) {
            throw new Error('Оценка должна быть от 1 до 10');
        }
        if (!text || !text.trim()) {
            throw new Error('Текст отзыва не может быть пустым');
        }

        const existing = await Review.findOne({ where: { userId, kinopoiskId } });
        let review;
        if (existing) {
            existing.rating = rating;
            existing.text = text;
            review = await existing.save();
        } else {
            review = await Review.create({ userId, kinopoiskId, rating, text });
        }

        await userMovieService.addToList(userId, kinopoiskId, 'watched');

        return review;
    }

    async removeReview(userId, kinopoiskId) {
        return Review.destroy({ where: { userId, kinopoiskId } });
    }

    async getByMovie(kinopoiskId) {
        const reviews = await Review.findAll({
            where: { kinopoiskId },
            order: [['createdAt', 'DESC']],
        });
        const users = await UserModel.findAll({
            where: { id: reviews.map((r) => r.userId) },
            attributes: ['id', 'email'],
        });
        return reviews.map((r) => {
            const u = users.find((user) => user.id === r.userId);
            return {
                id: r.id,
                userId: r.userId,
                email: u ? u.email : null,
                rating: r.rating,
                text: r.text,
            };
        });
    }
}

module.exports = new ReviewService();