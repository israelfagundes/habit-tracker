import { useContext } from 'react';

import { SummaryContext } from '../contexts/SummaryContext';

export function useSummary() {
  const context = useContext(SummaryContext);
  return context;
}
