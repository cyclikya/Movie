const UserModel = require('../models/user-model.js');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user-dtos.js');
const tokenService = require('./token-service.js');

class UserService {
    async registration(email, password) {
        const candidate = UserModel.findUserByEmail(email);
        if (candidate) {
            throw new Error(`Пользователь с ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = UserModel.createUser({ email, password: hashPassword });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }    
}

module.exports = new UserService()