import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const appointmentsService = container.resolve(ListAppointmentsService);

    const appointments = await appointmentsService.execute();

    return response.json(appointments);
  }
}

export default new AppointmentsController();
