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

    async getPopularFilms(req, res) {
        try {
            return res.json(await movieService.getPopularFilms(req.query.page));
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async getPopularSeries(req, res) {
        try {
            return res.json(await movieService.getPopularSeries(req.query.page));
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

    async getFilters(req, res) {
        try {
            return res.json(await movieService.getFilters());
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async discover(req, res) {
        try {
            const toArray = (v) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
            const data = await movieService.discover({
                genres: toArray(req.query.genres),
                countries: toArray(req.query.countries),
                yearFrom: req.query.yearFrom,
                yearTo: req.query.yearTo,
                ratingFrom: req.query.ratingFrom,
                ratingTo: req.query.ratingTo,
                keyword: req.query.keyword,
                type: req.query.type,
                order: req.query.order,
                page: req.query.page,
            });
            return res.json(data);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
}

module.exports = new MovieController();