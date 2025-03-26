/**
 * Converts time string in format "HH:mm" to minutes since 9:00am
 */
export const timeToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return (hours - 9) * 60 + minutes;
};
