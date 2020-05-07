import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findAll(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppoitment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppoitment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
