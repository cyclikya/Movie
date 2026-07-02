const userMovieService = require('../service/user-movie-service.js');

class UserMovieController {
    async add(req, res) {
        try {
            const userId = req.user.id;
            const { kinopoiskId, status } = req.body;
            const item = await userMovieService.addToList(userId, kinopoiskId, status);
            return res.json(item);
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async remove(req, res) {
        try {
            const userId = req.user.id;
            const { kinopoiskId } = req.params;
            await userMovieService.removeFromList(userId, kinopoiskId);
            return res.json({ message: 'Удалено из списка' });
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async getMy(req, res) {
        try {
            const userId = req.user.id;
            const { status } = req.query;
            const list = await userMovieService.getMyList(userId, status);
            return res.json(list);
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async getMyFull(req, res) {
        try {
            const userId = req.user.id;
            const { status } = req.query;
            const list = await userMovieService.getMyListFull(userId, status);
            return res.json(list);
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
}

module.exports = new UserMovieController();