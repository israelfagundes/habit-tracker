export function generateProgressPercentage(total: number, completed: number) {
  return completed > 0 ? Math.round((completed / total) * 100) : 0;
}