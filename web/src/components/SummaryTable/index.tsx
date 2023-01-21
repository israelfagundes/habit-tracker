import { useEffect, useState } from "react"

import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning"
import HabitDay from "../HabitDay"

import { api } from "../../lib/axios"
import dayjs from "dayjs"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

interface HabitDay {
  id: string;
  date: string;
  habits: number;
  completed: number;
}

export default function SummaryTable() {
  const [summary, setSummary] = useState<HabitDay[]>([])
  
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/summary')

        setSummary(response.data)
      } catch(e) {
        console.error(e)
      }
    })()
  }, [])
  
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div key={index} className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center">
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length && summaryDates.map(date => {
          const dayInSummary = summary.find(day => dayjs(date).isSame(day.date, 'day')
          )
          
          return (
            <HabitDay 
              key={date.toString()}
              date={date}
              habits={dayInSummary?.habits}
              defaultCompleted={dayInSummary?.completed}
            />
          )
        }) || <></>}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => (
          <HabitDay disabled key={index} />
        ))}
      </div>
    </div>
  )
}