const reviewService = require('../service/review-service.js');

class ReviewController {
    async add(req, res) {
        try {
            const userId = req.user.id;
            const { kinopoiskId, rating, text } = req.body;
            const review = await reviewService.addReview(userId, kinopoiskId, rating, text);
            return res.json(review);
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async remove(req, res) {
        try {
            const userId = req.user.id;
            const { kinopoiskId } = req.params;
            await reviewService.removeReview(userId, kinopoiskId);
            return res.json({ message: 'Отзыв удалён' });
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async getByMovie(req, res) {
        try {
            const { kinopoiskId } = req.params;
            const reviews = await reviewService.getByMovie(kinopoiskId);
            return res.json(reviews);
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
}

module.exports = new ReviewController();