import { FastifyRequest } from "fastify"
import { z } from 'zod'

import HabitsRepository from "../repositories/HabitsRepository"

class HabitsController {
  async create(req: FastifyRequest) {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })

    const { title, weekDays } = createHabitBody.parse(req.body)

    return await HabitsRepository.createHabit(title, weekDays)
  }

  async toggle(req: FastifyRequest) {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    })

    const { id } = toggleHabitParams.parse(req.params)

    return await HabitsRepository.toggleHabit(id)
  }
}

export default new HabitsController()