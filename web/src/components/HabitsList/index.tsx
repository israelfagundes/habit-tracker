import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/axios";

import { Checkbox } from "../Checkbox";

interface Props {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

interface Habits {
  habits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChange }: Props) {
  const [habits, setHabits] = useState<Habits>()
  
  useEffect(() => {
    api.get('/day', {
      params: {
        date: date.toISOString(),
      }
    }).then(response => setHabits(response.data))
  }, [])

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())
  
  const handleToggleHabit = useCallback(async (habitId: string) => {
    await api.patch(`/habits/${habitId}/toggle`)
    
    const isHabitAlreadyComplete = habits!.completedHabits.includes(habitId)

    let completedHabits: string[] = []
    
    if (isHabitAlreadyComplete) {
      completedHabits = habits!.completedHabits.filter((id) => id !== habitId)
    } else {
      completedHabits = [...habits!.completedHabits, habitId]
    }

    setHabits(prev => ({ ...prev, completedHabits} as Habits))
    onCompletedChange(completedHabits.length)
  }, [habits])
  
  return (
      <div className="mt-6 flex flex-col gap-3">
        {habits?.habits.map(habit => (
            <Checkbox
              key={habit.id}
              disabled={isDateInPast}
              checked={habits.completedHabits.includes(habit.id)}
              onCheckedChange={() => handleToggleHabit(habit.id)}
            >
              {habit.title}
            </Checkbox>
        ))}
      </div>
  )
}