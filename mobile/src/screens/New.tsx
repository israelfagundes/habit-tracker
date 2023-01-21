import { useState } from "react";
import { View, ScrollView, Text, TextInput, Alert } from "react-native";
import colors from "tailwindcss/colors";

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { ConfirmButton } from "../components/ConfirmButton";

import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado' ]

export function New() {
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
  
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <BackButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600 "
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={handleTextChange}
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            label={weekDay}
            checked={checkedWeekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <ConfirmButton disabled={isLoading} onPress={handleSubmit} />
        
      </ScrollView>
    </View>
  )
}