import { Habits } from "../../hooks/useHabits";
import { Checkbox } from "../Checkbox";

interface Props {
  habitsList?: Habits;
  isDateInPast: boolean;
  onToggleHabit: (habitId: string) => Promise<void>;
}

export function HabitsList({ habitsList, isDateInPast, onToggleHabit }: Props) {
  return (
      <div className="mt-6 flex flex-col gap-3 overflow-y-scroll max-h-[30vh]">
        {habitsList?.habits.map(habit => (
          <Checkbox
            key={habit.id}
            disabled={isDateInPast}
            checked={habitsList.completedHabits.includes(habit.id)}
            onCheckedChange={() => onToggleHabit(habit.id)}
          >
            {habit.title}
          </Checkbox>
        ))}
      </div>
  )
}