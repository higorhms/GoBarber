import FakeAppointmentsRepository from '../repositories/fakes/FakeAppoitmentsRepository';
import ListAppointmentsService from './ListAppointmentsService';
import CreateAppointmentService from './CreateAppointmentService';

describe('ListAppointments', () => {
  it('should be able to return all appointments', async () => {
    const appointmentRepository = new FakeAppointmentsRepository();
    const listAppointmentService = new ListAppointmentsService(
      appointmentRepository,
    );
    const appointmentService = new CreateAppointmentService(
      appointmentRepository,
    );

    await appointmentService.execute({
      date: new Date(2020, 4, 12, 13),
      provider_id: '123123',
    });

    await appointmentService.execute({
      date: new Date(2020, 4, 11, 12),
      provider_id: '111',
    });

    const appointments = await listAppointmentService.execute();

    expect(appointments[1].provider_id).toBe('111');
  });
});
