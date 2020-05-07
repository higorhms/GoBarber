import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppoitmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRoutes = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentRoutes.get('/', (request: Request, response: Response) => {
  return response.json(appointmentsRepository.findAll());
});

appointmentRoutes.post('/', (request: Request, response: Response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentRoutes;
