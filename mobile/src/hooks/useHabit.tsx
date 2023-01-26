
import { useEffect, useMemo, useState } from "react";
import { Alert } from 'react-native'
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";


import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

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

export function useHabit() {
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

  return { 
    isLoading, 
    dayOfWeek, 
    dayAndMonth, 
    progress, 
    isDateInPast, 
    habits, 
    handleToggleHabit 
  }
}