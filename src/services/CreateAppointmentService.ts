import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'

import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}


class CreateAppointmentService {
  // async function -> return Promise
  public async execute({ date, provider_id } : Request): Promise<Appointment> {
    //
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentsInSameDate) {

      throw new AppError('This appointment is already booked!');

    } else {

      // create an instance, but does not save in BD,
      const appointment = appointmentsRepository.create({

        provider_id: provider_id,

        date: appointmentDate

      });
      // save in BD, then use await
      await appointmentsRepository.save(appointment)

      return appointment;
    }

  };

}

export default CreateAppointmentService;
