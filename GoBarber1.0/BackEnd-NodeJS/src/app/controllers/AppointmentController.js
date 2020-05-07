import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';

import pt from 'date-fns/locale/pt';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class AppointmentController {
    /**
     * List all Appointments of user that is making request
     */
    async index(req, res) {
        const { page = 1 } = req.query;

        const appointments = await Appointment.findAll({
            where: {
                user_id: req.userId,
                canceled_at: null,
            },
            limit: 20,
            offset: (page - 1) * 20,
            order: ['date'],
            attributes: ['id', 'date', 'past', 'cancelable'],
            include: {
                model: User,
                as: 'provider',
                attributes: ['id', 'name'],
                include: {
                    model: File,
                    as: 'avatar',
                    attributes: ['path', 'url'],
                },
            },
        });

        res.json(appointments);
    }

    /**
     * Create a appointment
     */
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
         * Check if the user is provider
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
         * Check for past dates
         */
        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return res
                .status(400)
                .json({ error: 'Past dates are not permitted' });
        }

        /**
         * Check date availability
         */
        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });

        if (checkAvailability) {
            return res.status(400).json({
                error: 'Appointment date is not available',
            });
        }

        /**
         * Check if the users are the same
         */
        if (checkIsProvider.id === req.userId) {
            return res.json({ error: 'You can not make this appointment' });
        }

        /**
         * Notify appointment provider
         */
        const user = await User.findByPk(req.userId);
        const formattedDate = format(hourStart, "dd 'de ' MMMM 'às' H:mm'h'", {
            locale: pt,
        });

        await Notification.create({
            content: `Novo agendamento de ${user.name} para o dia: ${formattedDate}`,
            user: 23,
        });

        /**
         * Creating a appointment
         */
        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date,
        });

        return res.json(appointment);
    }

    /**
     * Cancel a appointment
     */
    async delete(req, res) {
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['name', 'email'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                },
            ],
        });

        if (appointment.user_id !== req.userId) {
            res.status(401).json({
                error: 'You not have permission to cancel this appointment',
            });
        }

        const dateWithSub = subHours(appointment.date, 2);

        if (isBefore(dateWithSub, new Date())) {
            res.json(401).json({
                error: 'You only can cancel appointment 2 hours advanced',
            });
        }
        appointment.canceled_at = new Date();

        await appointment.save();

        /**
         * Add the background job in queue for send email to providers
         */
        await Queue.add(CancellationMail.key, {
            appointment,
        });

        res.json(appointment);
    }
}

export default new AppointmentController();
