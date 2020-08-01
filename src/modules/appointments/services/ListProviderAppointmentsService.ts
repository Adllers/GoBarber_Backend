import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {

  constructor(

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

  ) {}

  public async execute({ provider_id, month, year, day }: IRequest): Promise<Appointment[]> {

    const appointments = await this.appointmentsRepository.findByDayAppointmentsFromProvider({
      provider_id,
      month,
      year,
      day
    });

    return appointments;

  }
}

export default ListProviderAppointmentsService;
