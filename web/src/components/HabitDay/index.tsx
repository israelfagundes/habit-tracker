import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

import { ProgressBar } from '../ProgressBar';
import { HabitsList } from '../HabitsList';
import { useHabits } from '../../hooks/useHabits';

interface HabitDayProps {
  defaultCompleted?: number;
  habits?: number;
  date?: Date;
  disabled?: boolean;
}

export default function HabitDay({ defaultCompleted = 0, habits = 0, disabled, date }: HabitDayProps) {
  const {
    completedPercentage,
    dayAndMonth,
    dayOfWeek,
    habits: dayHabits,
    handleToggleHabit,
    isDateInPast,
  } = useHabits({ date, defaultCompleted, defaultHabits: habits });

  return (
    <Popover.Root>
      <Popover.Trigger
        disabled={disabled}
        className={clsx(
          'w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background',
          {
            'opacity-40 cursor-not-allowed bg-zinc-900 border-zinc-800': disabled,
            'cursor-pointer': !disabled,
            'bg-zinc-900 border-zinc-800': completedPercentage === 0,
            'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
            'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
            'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
            'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
            'bg-violet-500 border-violet-400': completedPercentage >= 80,
          },
        )}
      />
      <Popover.Portal>
        <Popover.Content
          className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
          collisionBoundary={document.getElementById('root')}
        >
          <span className="font-semibold text-zinc-400 capitalize">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList habitsList={dayHabits} onToggleHabit={handleToggleHabit} isDateInPast={isDateInPast} />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
