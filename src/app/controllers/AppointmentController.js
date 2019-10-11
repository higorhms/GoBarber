import * as Yup from 'yup';
import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
    async store(req, res) {
        /**
         * Yup validation, check if the request body has this itens, and require them
         */
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        /**
         * Check if the user is provider------------------------------------------
         */
        const { provider_id, date } = req.body;

        const checkIsProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        });

        if (!checkIsProvider) {
            return res.status(401).json({
                error: 'You can only create a appointments with providers',
            });
        }

        /**
         * Creating a appointment  ------------------------------------------
         */
        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date,
        });

        return res.json(appointment);
    }
}

export default new AppointmentController();
