export const calculateHeatBg = (value: number, max: number): string => {
  if (max === 0) return 'none';

  const intensity = value / max;
  const op = Math.min(intensity, 1) * 0.8; 

  return `rgba(147, 51, 234, ${op})`; 
};