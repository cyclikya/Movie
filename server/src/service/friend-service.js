const Subscription = require('../models/subscription-model.js');
const UserModel = require('../models/user-model.js');

async function usersByIds(ids) {
    if (ids.length === 0) return [];
    return UserModel.findAll({ where: { id: ids }, attributes: ['id', 'email'] });
}

class FriendService {
    async subscribe(followerId, followingId) {
        followingId = Number(followingId);
        if (followerId === followingId) {
            throw new Error('Нельзя подписаться на себя');
        }
        const target = await UserModel.findOne({ where: { id: followingId } });
        if (!target) {
            throw new Error('Пользователь не найден');
        }
        const existing = await Subscription.findOne({ where: { followerId, followingId } });
        if (existing) {
            throw new Error('Вы уже подписаны');
        }
        return Subscription.create({ followerId, followingId });
    }

    async unsubscribe(followerId, followingId) {
        return Subscription.destroy({ where: { followerId, followingId: Number(followingId) } });
    }

    async acceptRequest(userId, requesterId) {
        requesterId = Number(requesterId);
        const incoming = await Subscription.findOne({
            where: { followerId: requesterId, followingId: userId },
        });
        if (!incoming) throw new Error('Заявка не найдена');
        incoming.status = 'accepted';
        await incoming.save();

        // подписываемся в ответ → взаимность = друзья
        const back = await Subscription.findOne({
            where: { followerId: userId, followingId: requesterId },
        });
        if (back) {
            back.status = 'accepted';
            await back.save();
        } else {
            await Subscription.create({ followerId: userId, followingId: requesterId, status: 'accepted' });
        }
        return incoming;
    }

    async rejectRequest(userId, requesterId) {
        const sub = await Subscription.findOne({
            where: { followerId: Number(requesterId), followingId: userId },
        });
        if (!sub) throw new Error('Заявка не найдена');
        sub.status = 'rejected';
        return sub.save();
    }

    async getFriends(userId) {
        const subs = await Subscription.findAll({
            where: { followingId: userId, status: 'accepted' },
        });
        return usersByIds(subs.map((s) => s.followerId));
    }

    async getSubscribers(userId) {
        const subs = await Subscription.findAll({ where: { followingId: userId } });
        const users = await usersByIds(subs.map((s) => s.followerId));
        return subs.map((s) => {
            const u = users.find((user) => user.id === s.followerId);
            return { id: s.followerId, email: u ? u.email : null, status: s.status };
        });
    }

    async getSubscriptions(userId) {
        const subs = await Subscription.findAll({ where: { followerId: userId } });
        return usersByIds(subs.map((s) => s.followingId));
    }

    async removeFriend(userId, friendId) {
        friendId = Number(friendId);
        // убираю свою подписку на него
        await Subscription.destroy({ where: { followerId: userId, followingId: friendId } });
        // его подписка на меня остаётся, но больше не "друг" → возвращаем в подписчики
        const theirs = await Subscription.findOne({
            where: { followerId: friendId, followingId: userId },
        });
        if (theirs) {
            theirs.status = 'pending';
            await theirs.save();
        }
    }
}

module.exports = new FriendService();