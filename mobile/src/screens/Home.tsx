import { View, Text, ScrollView } from "react-native";
import dayjs from "dayjs";

import {
  WEEK_DAYS,
  DATES_FROM_YEAR_START,
  DAYS_TO_FILL,
  DAY_SIZE
} from '../utils/constants'

import { useHome } from "../hooks/useHome";

import { Header } from "../components/Header";
import { HabitDay } from "../components/HabitDay";
import { Loading } from "../components/Loading";


export function Home() {
  const { loading, summary, handleNavigateToHabit } = useHome()
  
  if (loading) return <Loading />
  
  return (
    <View className='bg-background flex-1 px-8 pt-16'>
      <Header />

      <View className="flex-row mt-6 mb-2">
        {WEEK_DAYS.map((weekDay, index) => (
          <Text
            key={index} 
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {DATES_FROM_YEAR_START.map(date => {
            const dayInSummary = summary.find(day => dayjs(date).isSame(day.date, 'day')
            )
            
            return (
              <HabitDay 
                key={date.toString()}
                date={date}
                habits={dayInSummary?.habits}
                completed={dayInSummary?.completed}
                onPress={() => handleNavigateToHabit(date.toString())} 
              />
            )
          })}

          {!!DAYS_TO_FILL && Array.from({ length: DAYS_TO_FILL }).map((_, index) => (
            <HabitDay disabled key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}