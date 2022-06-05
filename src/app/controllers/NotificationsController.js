import User from '../models/User';
import Notifications from '../schema/Notifications';

class NotificationsController {
  async index(req, res) {

    const checkIsCollaborator = await User.findOne({
      where: {
        id: req.user_id,
        provider: true,
      }
    });

    if (!checkIsCollaborator) {
      return res.status(401).json({
        err: 'Notificações disponível apenas para colaboradores'
      }).sort({ createdAt: 'desc' }).limit(20);
    }

    const notifications = await Notifications.find({
      user: req.user_id
    });

    return res.json(notifications);
  }

  async update(req, res) {

    const notifications = await Notifications.findOneAndUpdate(
      req.params.id, 
      { read: true },
      { new: true },
    ); 

    return res.json(notifications);
  }
}

export default new NotificationsController();