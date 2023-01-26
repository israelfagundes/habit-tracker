import { View, Text, ScrollView, Alert } from "react-native";
import dayjs from "dayjs";

import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";

import { useHome } from "../hooks/useHome";

import { Header } from "../components/Header";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Loading } from "../components/Loading";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart()
const minimumSummaryDatesSize = 18 * 5;
const daysToFill = minimumSummaryDatesSize - datesFromYearStart.length

export function Home() {
  const { loading, summary, handleNavigateToHabit } = useHome()
  
  if (loading) return <Loading />
  
  return (
    <View className='bg-background flex-1 px-8 pt-16'>
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => (
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
          {datesFromYearStart.map(date => {
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

          {!!daysToFill && Array.from({ length: daysToFill }).map((_, index) => (
            <HabitDay disabled key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}