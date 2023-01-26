import { ScrollView, Text, View } from "react-native";
import clsx from "clsx";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { EmptyHabits } from "../components/EmptyHabits";

import { useHabit } from "../hooks/useHabit";

export function Habit() {
  const { 
    isLoading, 
    dayOfWeek, 
    dayAndMonth, 
    progress, 
    isDateInPast, 
    habits, 
    handleToggleHabit 
  } = useHabit()
  
  if (isLoading) {
    return <Loading />
  }
  
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <BackButton/>

      <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
        {dayOfWeek}
      </Text>

      <Text className="text-white font-extrabold text-3xl">
        {dayAndMonth}
      </Text>

      <ProgressBar progress={progress} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        className={clsx('mt-6', {
          'opacity-70': isDateInPast,
        })}
      >
        <View>
          {habits?.habits.length ? (
            <>
              {habits?.habits.map(habit => (
                <Checkbox disabled={isDateInPast} key={habit.id} bold label={habit.title} checked={habits?.completedHabits.includes(habit.id)} onPress={() => handleToggleHabit(habit.id)} />
              ))}
            </>
          ) : (
            <EmptyHabits />
          )}
        </View>

        {isDateInPast && (
          <Text className="text-zinc-400 mt-10 text-center">
            Você não pode editar hábitos de uma data passada.
          </Text>
        )}
      </ScrollView>
    </View>
  )
}