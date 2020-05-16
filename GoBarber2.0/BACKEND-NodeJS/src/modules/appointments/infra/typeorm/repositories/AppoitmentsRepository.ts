import { Repository, getRepository } from 'typeorm';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    const savedAppointment = await this.ormRepository.save(appointment);

    return savedAppointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppoitment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppoitment || undefined;
  }
}

export default AppointmentsRepository;
