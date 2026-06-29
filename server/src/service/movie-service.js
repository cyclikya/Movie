const API_URL = 'https://kinopoiskapiunofficial.tech';

async function kinopoiskFetch(path) {
    const response = await fetch(`${API_URL}${path}`, {
        headers: {
            'X-API-KEY': process.env.KINOPOISK_API_KEY,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Kinopoisk API ответил ошибкой: ${response.status}`);
    }
    return response.json();
}

class MovieService {
    async getPopular(page = 1) {
        return kinopoiskFetch(`/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${page}`);
    }

    async getPremieres(year, month) {
        return kinopoiskFetch(`/api/v2.2/films/premieres?year=${year}&month=${month}`);
    }

    async search(keyword, page = 1) {
        return kinopoiskFetch(`/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
    }

    async getById(id) {
        return kinopoiskFetch(`/api/v2.2/films/${id}`);
    }

    async getSimilars(id) {
        return kinopoiskFetch(`/api/v2.2/films/${id}/similars`);
    }
    
    async getStaff(filmId) {
        return kinopoiskFetch(`/api/v1/staff?filmId=${filmId}`);
    }

    async getVideos(id) {
        return kinopoiskFetch(`/api/v2.2/films/${id}/videos`);
    }
}

module.exports = new MovieService();