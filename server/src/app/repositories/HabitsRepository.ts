import dayjs from "dayjs"
import { prisma } from '../../lib/prisma'

class HabitsRepository {
  async createHabit(title: string, weekDays: number[]) {
    const today = dayjs().startOf('day').toDate()

    return await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => ({
            week_day: weekDay
          }))
        }
      }
    })
  }

  async toggleHabit(id: string) {
    const today = dayjs().startOf('day').toDate()

    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id
        }
      }
    })

    if (dayHabit) {
      return await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      })
    } else {
      return await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
    }
  }
}

export default new HabitsRepository()