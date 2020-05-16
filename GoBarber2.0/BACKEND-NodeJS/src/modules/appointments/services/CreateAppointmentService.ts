import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

class CreateAppointmentService {
  private appointmentsRepository: IAppointmentsRepository;

  constructor(repository: IAppointmentsRepository) {
    this.appointmentsRepository = repository;
  }

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
