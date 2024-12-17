import React from 'react';
import { SlotType } from '../../constants/seats';

interface TimeSlotSelectorProps {
  slotType: SlotType;
  selectedTimeSlot: { start: string; end: string } | null;
  onTimeSlotSelect: (slot: { start: string; end: string }) => void;
}

export default function TimeSlotSelector({ slotType, selectedTimeSlot, onTimeSlotSelect }: TimeSlotSelectorProps) {
  // For full day access, only show 7AM-11PM slot
  if (slotType.id === '12hours') {
    const fullDaySlot = { start: '07:00', end: '23:00' };
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Time Slot</h2>
        <button
          type="button"
          onClick={() => onTimeSlotSelect(fullDaySlot)}
          className="w-full p-3 rounded-lg text-center bg-blue-600 text-white"
        >
          Full Day Access (7:00 AM - 11:00 PM)
        </button>
      </div>
    );
  }

  // Generate time slots based on duration
  const generateTimeSlots = () => {
    const slots = [];
    const startTimes = [
      '07:00', '08:00', '09:00', '10:00', '11:00', 
      '12:00', '13:00', '14:00', '15:00', '16:00',
      '17:00', '18:00', '19:00'
    ];
    
    for (const startTime of startTimes) {
      const [hours] = startTime.split(':').map(Number);
      const endHours = hours + slotType.duration;
      
      if (endHours <= 23) {
        slots.push({
          start: startTime,
          end: `${endHours.toString().padStart(2, '0')}:00`
        });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Select Time Slot</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeSlots.map((slot) => (
          <button
            key={`${slot.start}-${slot.end}`}
            type="button"
            onClick={() => onTimeSlotSelect(slot)}
            className={`
              p-3 rounded-lg text-center transition-colors
              ${selectedTimeSlot?.start === slot.start
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 hover:bg-blue-100 text-blue-900'}
            `}
          >
            {slot.start} - {slot.end}
          </button>
        ))}
      </div>
    </div>
  );
}