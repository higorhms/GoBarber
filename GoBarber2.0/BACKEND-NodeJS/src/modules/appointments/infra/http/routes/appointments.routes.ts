import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddleware from '@modules/users/infra/http/middlewares/authMiddleware';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentRoutes = Router();

appointmentRoutes.use(authMiddleware);

appointmentRoutes.get('/', AppointmentsController.index);

appointmentRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  AppointmentsController.create,
);

appointmentRoutes.get('/me', ProviderAppointmentsController.index);

export default appointmentRoutes;
