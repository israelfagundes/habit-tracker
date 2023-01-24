import { FastifyInstance } from "fastify"

import DaysController from './app/controllers/DaysController'
import HabitsController from './app/controllers/HabitsController'


export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', HabitsController.create)
  app.patch('/habits/:id/toggle', HabitsController.toggle)

  app.get('/summary', DaysController.index)
  app.get('/day', DaysController.show)
}
