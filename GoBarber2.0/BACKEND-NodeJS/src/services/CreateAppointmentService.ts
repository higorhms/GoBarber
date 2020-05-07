import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppoitmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const dateFormatted = startOfHour(date);

    const findAppoitmentInSameDate = this.appointmentsRepository.findByDate(
      dateFormatted,
    );

    if (findAppoitmentInSameDate) {
      throw Error('This appointment was already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: dateFormatted,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
