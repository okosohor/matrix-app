export const calculatePercentile = (values: number[], percentile: number): number => {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);

  const min = Math.floor(index);
  const max = Math.ceil(index);

  if (min === max) return sorted[min];

  const num = index - min;
  return Math.round(sorted[min] * (1 - num) + sorted[max] * num);
};
