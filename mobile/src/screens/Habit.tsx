import { Alert, ScrollView, Text, View } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { EmptyHabits } from "../components/EmptyHabits";

import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from "clsx";

interface Params {
  date: string;
}

interface Habits {
  habits: {
    id: string;
    title: string;
  }[];
  completedHabits: string[]
}

export function Habit({}) {
  const route = useRoute();
  const { date } = route.params as Params;

  const [isLoading, setIsLoading] = useState(true)
  const [habits, setHabits] = useState<Habits>()

  const progress = useMemo(() => (
    habits?.habits.length ? generateProgressPercentage(habits?.habits.length, habits?.completedHabits.length) : 0
  ), [habits])

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
  
  useEffect(() => {
    setIsLoading(true)
    api.get('/day', { params : { date }})
      .then((response) => setHabits(response.data))
      .catch((err) => {
        console.error(err)
        Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos')
      })
      .finally(() => setIsLoading(false))
  }, [])
  
  if (isLoading) {
    return <Loading />
  }

  const handleToggleHabit = async (habitId: string) => {
    try {
      await api.patch(`/habits/${habitId}/toggle`)
    } catch(err) {
      console.error(err)
      Alert.alert('Ops', 'Não foi possível atualizar o status do hábito')
    }


    let completedHabits: string[] = [];
    
    if (habits!.completedHabits.includes(habitId)) {
      completedHabits = habits!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habits!.completedHabits, habitId]
    }

    setHabits((prev) => ({ ...prev, completedHabits }) as Habits)
  }
  
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <BackButton/>

      <Text className="mt-6 text-zinc-400 font-semibold text-base lowecase">
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