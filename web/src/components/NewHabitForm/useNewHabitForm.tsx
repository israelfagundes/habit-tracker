import { ChangeEvent, FormEvent, useState } from 'react';

import { api } from '../../lib/axios';
import { useSummary } from '../../hooks/useSummary';

export function useNewHabitForm() {
  const { fetchSummary } = useSummary();
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays((prev) => prev.filter((day) => day !== weekDay));
    } else {
      setWeekDays((prev) => [...prev, weekDay]);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title || !weekDays.length) return;

    await api.post('/habits', {
      title,
      weekDays,
    });

    setTitle('');
    setWeekDays([]);
    fetchSummary();
  }

  return {
    handleTitleChange,
    handleToggleWeekDay,
    handleSubmit,
    title,
    weekDays,
  };
}
