import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import authMiddleware from '../middlewares/authMiddleware';
import AppointmentsRepository from '../repositories/AppoitmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRoutes = Router();

appointmentRoutes.use(authMiddleware);

appointmentRoutes.get('/', async (request: Request, response: Response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  return response.json(await appointmentsRepository.find());
});

appointmentRoutes.post('/', async (request: Request, response: Response) => {
  const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();

  const appointment = await createAppointmentService.execute({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentRoutes;
