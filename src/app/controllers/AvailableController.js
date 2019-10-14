import {
    startOfDay,
    endOfDay,
    setSeconds,
    setMinutes,
    setHours,
    format,
    isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvaiableController {
    async index(req, res) {
        const { providerId } = req.params;
        const { date } = req.query;

        if (!date) {
            res.status(400).json({ error: 'Date is invalid' });
        }

        const searchedDate = Number(date);

        const appointments = await Appointment.findAll({
            where: {
                provider_id: providerId,
                canceled_at: null,
                date: {
                    [Op.between]: [
                        startOfDay(searchedDate),
                        endOfDay(searchedDate),
                    ],
                },
            },
        });

        const schedule = [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
        ];

        const available = schedule.map(time => {
            const [hour, minute] = time.split(':');
            const formattedDate = setSeconds(
                setMinutes(setHours(searchedDate, hour), minute),
                0
            );
            return {
                time,
                value: format(formattedDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                available:
                    isAfter(formattedDate, new Date()) &&
                    !appointments.find(
                        appointment =>
                            format(appointment.date, 'HH:mm') === time
                    ),
            };
        });

        res.json(available);
    }
}

export default new AvaiableController();
