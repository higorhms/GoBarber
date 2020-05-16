import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const dateFormatted = startOfHour(date);

    const findAppoitmentInSameDate = await this.appointmentsRepository.findByDate(
      dateFormatted,
    );

    if (findAppoitmentInSameDate) {
      throw new AppError('This appointment was already booked', 401);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: dateFormatted,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
