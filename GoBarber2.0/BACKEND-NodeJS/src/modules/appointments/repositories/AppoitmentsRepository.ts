import { Repository, EntityRepository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppoitment = await this.findOne({ where: { date } });

    return findAppoitment || null;
  }
}

export default AppointmentsRepository;
