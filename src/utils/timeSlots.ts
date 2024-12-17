import { TimeRange } from '../types/seat';

export const parseTime = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export const doTimeSlotsOverlap = (slot1: TimeRange, slot2: TimeRange): boolean => {
  const start1 = parseTime(slot1.start);
  const end1 = parseTime(slot1.end);
  const start2 = parseTime(slot2.start);
  const end2 = parseTime(slot2.end);

  return start1 < end2 && start2 < end1;
};

export const generateTimeSlots = (duration: number): TimeRange[] => {
  const slots: TimeRange[] = [];
  const startTimes = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', 
                     '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  for (const startTime of startTimes) {
    const [hours] = startTime.split(':').map(Number);
    const endHours = hours + duration;
    
    if (endHours <= 23) {
      slots.push({
        start: startTime,
        end: `${endHours.toString().padStart(2, '0')}:00`
      });
    }
  }

  return slots;
};