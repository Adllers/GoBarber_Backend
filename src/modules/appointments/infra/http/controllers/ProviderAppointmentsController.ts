import { Request, Response } from 'express';

import { container } from 'tsyringe'

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {

  public async index(request: Request , response: Response): Promise<Response> {
    // request.provider_id to know about log from user in any part on system
    const provider_id = request.user.id;

    const { day, month, year } = request.body;

    const listProviderAppointments = container.resolve(ListProviderAppointmentsService);

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments)
  }

}
