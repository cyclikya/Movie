const movieService = require('../service/movie-service.js');

class MovieController {
    async getMoviePage(req, res) {
        try {
            const data = await movieService.getMoviePage(req.params.id);
            return res.json(data);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async getPopular(req, res) {
        try {
            const data = await movieService.getPopular(req.query.page);
            return res.json(data);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async getPremieres(req, res) {
        try {
            const { year, month } = req.query;
            const data = await movieService.getPremieres(year, month);
            return res.json(data);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async search(req, res) {
        try {
            const data = await movieService.search(req.query.q, req.query.page);
            return res.json(data);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async getById(req, res) {
        try {
            const data = await movieService.getById(req.params.id);
            return res.json(data);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async getSimilars(req, res) {
        try {
            const data = await movieService.getSimilars(req.params.id);
            return res.json(data);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async getStaff(req, res) {
        try {
            const data = await movieService.getStaff(req.params.id);
            return res.json(data);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async getVideos(req, res) {
        try {
            const data = await movieService.getVideos(req.params.id);
            return res.json(data);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
}

module.exports = new MovieController();