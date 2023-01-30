import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

import { HabitDay } from "../@types/HabitDay";
import { api } from "../lib/axios";

interface ContextProps {
  summary: HabitDay[];
  fetchSummary: () => Promise<void>;
}

interface ProviderProps {
  children: ReactNode;
}

export const SummaryContext = createContext<ContextProps>({ summary: [], fetchSummary: async () => {} })

export function SummaryContextProvider({ children }: ProviderProps) {
  const [summary, setSummary] = useState<HabitDay[]>([])

  const fetchSummary = useCallback(async () => {
    try {
      const response = await api.get('/summary')

      setSummary(response.data)
    } catch(e) {
      console.error(e)
    }
  }, [])
  
  useEffect(() => {
    (async () => {
      await fetchSummary()
    })()
  }, [])
  
  return (
    <SummaryContext.Provider value={{ summary, fetchSummary }}>
      {children}
    </SummaryContext.Provider>
  )
}