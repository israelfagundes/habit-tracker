import { useState } from "react";
import { Alert } from 'react-native' 

import { api } from "../lib/axios";

export function useNew() {
  const [title, setTitle] = useState('')
  const [checkedWeekDays, setCheckedWeekDays] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  function handleToggleWeekDay(weekDayIndex: number) {
    if (checkedWeekDays.includes(weekDayIndex)) {
      setCheckedWeekDays(prev => prev.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setCheckedWeekDays(prev => ([...prev, weekDayIndex].sort()))
    }
  }

  function handleTextChange(text: string) {
    setTitle(text)
  }

  async function handleSubmit() {
    try {
      setIsLoading(true)
      if (!title.trim() || !checkedWeekDays.length) {
        setIsLoading(false)
        return Alert.alert('Novo hábito', 'Preencha o título do hábito e escolha a periodicidade')
      }

      await api.post('/habits', { title, weekDays: checkedWeekDays })

      Alert.alert('Novo hábito', 'Hábito criado com sucesso!')
      setTitle('')
      setCheckedWeekDays([])
    } catch(err) {
      console.error(err)
      Alert.alert('Ops', 'Não foi possível criar o novo hábito')
    } finally {
      setIsLoading(false)
    }
  }
  
  return {
    handleTextChange,
    title,
    handleToggleWeekDay,
    checkedWeekDays,
    isLoading,
    handleSubmit,
  }
}