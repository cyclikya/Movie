const UserModel = require('../models/user-model.js');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user-dtos.js');
const tokenService = require('./token-service.js');
const { Op } = require('sequelize');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ where: { email } });
        if (candidate) {
            throw new Error(`Пользователь с ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({ email, password: hashPassword });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }   
    
    async login(email, password) {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            throw new Error('Пользователь с таким email не найден');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new Error('Неверный пароль');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('Не авторизован');
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new Error('Не авторизован');
        }

        const user = await UserModel.findOne({ where: { id: userData.id } });
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async getAllUsers() {
        const users = await UserModel.findAll();
        return users;
    }

    async searchUsers(query, excludeUserId) {
        return UserModel.findAll({
            where: {
                email: { [Op.iLike]: `%${query}%` },
                id: { [Op.ne]: excludeUserId },
            },
            attributes: ['id', 'email'],
        });
    }
}

module.exports = new UserService()