const userService = require('../service/user-service.js');

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return res.json(userData);
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json({ message: 'Вы вышли из системы' });
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            return res.status(401).json({ message: e.message });
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            return res.status(401).json({ message: e.message });
        }
    }

    async searchUsers(req, res, next) {
        try {
            const users = await userService.searchUsers(req.query.q, req.user.id);
            return res.json(users);
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
}

module.exports = new UserController()
