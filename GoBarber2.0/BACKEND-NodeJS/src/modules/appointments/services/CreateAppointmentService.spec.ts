import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppoitmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const appointmentRepository = new FakeAppointmentsRepository();
    const appointmentService = new CreateAppointmentService(
      appointmentRepository,
    );

    const appointment = await appointmentService.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentRepository = new FakeAppointmentsRepository();
    const appointmentService = new CreateAppointmentService(
      appointmentRepository,
    );

    const appointmentDate = new Date();

    await appointmentService.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    await expect(
      appointmentService.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
