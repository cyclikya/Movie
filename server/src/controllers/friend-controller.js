const friendService = require('../service/friend-service.js');

class FriendController {
    async subscribe(req, res) {
        try {
            const sub = await friendService.subscribe(req.user.id, req.params.userId);
            return res.json(sub);
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async unsubscribe(req, res) {
        try {
            await friendService.unsubscribe(req.user.id, req.params.userId);
            return res.json({ message: 'Отписались' });
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async getFriends(req, res) {
        try {
            return res.json(await friendService.getFriends(req.user.id));
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async getSubscribers(req, res) {
        try {
            return res.json(await friendService.getSubscribers(req.user.id));
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async getSubscriptions(req, res) {
        try {
            return res.json(await friendService.getSubscriptions(req.user.id));
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async accept(req, res) {
        try {
            const sub = await friendService.acceptRequest(req.user.id, req.params.userId);
            return res.json(sub);
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async reject(req, res) {
        try {
            const sub = await friendService.rejectRequest(req.user.id, req.params.userId);
            return res.json(sub);
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }

    async removeFriend(req, res) {
        try {
            await friendService.removeFriend(req.user.id, req.params.userId);
            return res.json({ message: 'Удалён из друзей' });
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    }
}

module.exports = new FriendController();