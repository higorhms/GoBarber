import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppoitmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
    const dateFormatted = startOfHour(date);
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppoitmentInSameDate = await appointmentsRepository.findByDate(
      dateFormatted,
    );

    if (findAppoitmentInSameDate) {
      throw Error('This appointment was already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: dateFormatted,
    });

    const createdAppointment = appointmentsRepository.save(appointment);

    return createdAppointment;
  }
}

export default CreateAppointmentService;
