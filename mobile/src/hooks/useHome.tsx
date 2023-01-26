import { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Alert } from "react-native";

import { api } from "../lib/axios";

interface HabitDay {
  id: string;
  date: string;
  completed: number;
  habits: number;
}

export function useHome() {
  const { navigate } = useNavigation()

  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<HabitDay[]>([])

  function handleNavigateToHabit(date: string) {
    navigate('habit', { date })
  }
  
  useFocusEffect(useCallback(() => {
    (async () => {
      try {
        setLoading(true)

        const response = await api.get('/summary')

        setSummary(response.data)
      } catch (err) {
        Alert.alert('Ops', 'Não foi possível carregar os hábitos.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    })()
  }, []))

  return {
    loading,
    summary,
    handleNavigateToHabit
  }
}