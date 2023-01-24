import { FastifyRequest } from 'fastify';
import { z } from 'zod'

import DaysRepository from '../repositories/DaysRepository';

class DaysController {
  async index() {
    const summary = await DaysRepository.getSummary()

    return summary
  }

  async show(req: FastifyRequest) {
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(req.query)

    const habitDay = await DaysRepository.getHabitDay(date)

    return habitDay
  }
}

export default new DaysController()