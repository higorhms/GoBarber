import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import authMiddleware from '@modules/users/infra/http/middlewares/authMiddleware';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentRoutes = Router();

appointmentRoutes.use(authMiddleware);

// appointmentRoutes.get('/', async (request: Request, response: Response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   return response.json(await appointmentsRepository.find());
// });

appointmentRoutes.post('/', async (request: Request, response: Response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = container.resolve(CreateAppointmentService);

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentRoutes;
