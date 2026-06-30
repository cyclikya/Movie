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

function toMovie(item) {
    return {
        id: item.kinopoiskId ?? item.filmId,
        title: item.nameRu || item.nameOriginal || 'Без названия',
        year: item.year ?? 0,
        rating: item.ratingKinopoisk ?? 0,
        poster: item.posterUrlPreview,
        cover: item.coverUrl || item.posterUrl || item.posterUrlPreview,
        genre: item.genres?.[0]?.genre ?? '',
        description: item.description ?? '',
    };
}

function toDetails(f) {
    return {
        id: f.kinopoiskId,
        title: f.nameRu || f.nameOriginal || 'Без названия',
        year: f.year,
        ratingKp: f.ratingKinopoisk ?? 0,
        ratingImdb: f.ratingImdb ?? 0,
        poster: f.posterUrl,
        cover: f.coverUrl || f.posterUrl,
        description: f.description ?? '',
        genres: (f.genres ?? []).map((g) => g.genre),
        countries: (f.countries ?? []).map((c) => c.country),
        ageLimit: f.ratingAgeLimits ? f.ratingAgeLimits.replace('age', '') + '+' : '',
        duration: f.filmLength ? `${Math.floor(f.filmLength / 60)}ч ${f.filmLength % 60}м` : '',
    };
}

function toActor(s) {
    return {
        id: s.staffId,
        name: s.nameRu || s.nameEn || 'Без имени',
        role: s.description ?? '',
        photo: s.posterUrl,
    };
}

class MovieService {
    async getMoviePage(id) {
        const [movie, similars, actors, trailer] = await Promise.all([
            this.getById(id),
            this.getSimilars(id).catch(() => []),
            this.getStaff(id).catch(() => []),
            this.getVideos(id).catch(() => null),
        ]);
        return { movie, similars, actors, trailer };
    }

    async getPopular(page = 1) {
        const data = await kinopoiskFetch(`/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${page}`);
        return data.items.map(toMovie);
    }

    async getPremieres(year, month) {
        const data = await kinopoiskFetch(`/api/v2.2/films/premieres?year=${year}&month=${month}`);
        return data.items.filter((i) => i.year === Number(year)).map(toMovie);
    }

    async search(keyword, page = 1) {
        const data = await kinopoiskFetch(`/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
        return data.films.map(toMovie);
    }

    async getById(id) {
        const film = await kinopoiskFetch(`/api/v2.2/films/${id}`);
        return toDetails(film);
    }

    async getSimilars(id) {
        const data = await kinopoiskFetch(`/api/v2.2/films/${id}/similars`);
        return data.items.map(toMovie);
    }

    async getStaff(filmId) {
        const staff = await kinopoiskFetch(`/api/v1/staff?filmId=${filmId}`);
        return staff.filter((s) => s.professionKey === 'ACTOR').map(toActor);
    }

    async getVideos(id) {
        const data = await kinopoiskFetch(`/api/v2.2/films/${id}/videos`);
        return data.items?.[0]?.url ?? null;
    }
}

module.exports = new MovieService();