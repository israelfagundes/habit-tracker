import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import clsx from "clsx";

import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import dayjs from "dayjs";

import { DAY_SIZE } from "../utils/constants";

interface Props extends TouchableOpacityProps {
  disabled?: boolean;
  habits?: number;
  completed?: number;
  date?: Date;
}

export function HabitDay({ disabled, habits = 0, completed = 0, date, ...rest }: Props) {
  const completedPercentage = generateProgressPercentage(habits, completed)
  const today = dayjs().startOf('day').toDate();
  const isToday = dayjs(date).isSame(today)
  
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={
        clsx(` rounded-lg border-2 m-1  ${disabled ? '' : ''}`, {
          'opacity-40' : disabled,
          'bg-zinc-900 border-zinc-800' : completedPercentage === 0,
          'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500 border-violet-400': completedPercentage >= 80,
          'border-white border-4': isToday
        })
      }
      style={{
        width: DAY_SIZE,
        height: DAY_SIZE
      }}
      {...rest}
    />
  )
}