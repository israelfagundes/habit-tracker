import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/axios';

export interface Habits {
  habits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

interface useHabitsParams {
  date?: Date;
  defaultCompleted?: number;
  defaultHabits?: number;
}

export function useHabits({ date, defaultCompleted = 0, defaultHabits = 0 }: useHabitsParams) {
  const [habits, setHabits] = useState<Habits>();
  const [completed, setCompleted] = useState(defaultCompleted);

  useEffect(() => {
    if (date) {
      api
        .get('/day', {
          params: {
            date: date.toISOString(),
          },
        })
        .then((response) => setHabits(response.data));
    }
  }, [date]);

  const completedPercentage = defaultHabits > 0 ? Math.round((completed / defaultHabits) * 100) : 0;

  const dayAndMonth = date && dayjs(date).format('DD/MM');
  const dayOfWeek = date && dayjs(date).format('dddd');

  const handleCompletedChange = useCallback((completed: number) => {
    setCompleted(completed);
  }, []);

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  const handleToggleHabit = useCallback(
    async (habitId: string) => {
      await api.patch(`/habits/${habitId}/toggle`);

      const isHabitAlreadyComplete = habits!.completedHabits.includes(habitId);

      let completedHabits: string[] = [];

      if (isHabitAlreadyComplete) {
        completedHabits = habits!.completedHabits.filter((id) => id !== habitId);
      } else {
        completedHabits = [...habits!.completedHabits, habitId];
      }

      setHabits((prev) => ({ ...prev, completedHabits } as Habits));
      handleCompletedChange(completedHabits.length);
    },
    [habits, handleCompletedChange],
  );

  return {
    isDateInPast,
    handleToggleHabit,
    completedPercentage,
    dayAndMonth,
    dayOfWeek,
    habits,
  };
}
