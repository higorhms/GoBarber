import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
    async index(req, res) {
        const checkIsProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!checkIsProvider) {
            res.status(401).json({ error: 'You are not a provider' });
        }

        const notifications = await Notification.find({
            user: req.userId,
        }).sort({ createdAt: 'desc' });

        res.json(notifications);
    }

    async update(req, res) {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );

        res.json(notification);
    }
}

export default new NotificationController();
