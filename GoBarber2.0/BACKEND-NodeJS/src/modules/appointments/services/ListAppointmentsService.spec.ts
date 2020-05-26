import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppoitmentsRepository';
import ListAppointmentsService from './ListAppointmentsService';
import CreateAppointmentService from './CreateAppointmentService';

let appointmentRepository: FakeAppointmentsRepository;
let listAppointmentService: ListAppointmentsService;
let appointmentService: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('ListAppointments', () => {
  beforeEach(() => {
    appointmentRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    listAppointmentService = new ListAppointmentsService(appointmentRepository);
    appointmentService = new CreateAppointmentService(
      appointmentRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to return all appointments', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await appointmentService.execute({
      date: new Date(2020, 5, 12, 13),
      user_id: 'user-id1',
      provider_id: 'provider-id1',
    });

    await appointmentService.execute({
      date: new Date(2020, 5, 10, 12),
      user_id: '123111',
      provider_id: '111221',
    });

    const appointments = await listAppointmentService.execute();

    expect(appointments[1].provider_id).toBe('111221');
  });
});
