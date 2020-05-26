import { Router } from 'express';

import authMiddleware from '@modules/users/infra/http/middlewares/authMiddleware';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentRoutes = Router();

appointmentRoutes.use(authMiddleware);

appointmentRoutes.get('/', AppointmentsController.index);

appointmentRoutes.post('/', AppointmentsController.create);

appointmentRoutes.get('/me', ProviderAppointmentsController.index);

export default appointmentRoutes;
