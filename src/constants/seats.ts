export interface SlotType {
  id: string;
  name: string;
  duration: number;
  maxShifts: number;
  basePrice: number;
}

export const SLOT_TYPES: SlotType[] = [
  {
    id: '4hours',
    name: '4 Hours Slot',
    duration: 4,
    maxShifts: 3,
    basePrice: 499
  },
  {
    id: '6hours',
    name: '6 Hours Slot',
    duration: 6,
    maxShifts: 2,
    basePrice: 599
  },
  {
    id: '8hours',
    name: '8 Hours Slot',
    duration: 8,
    maxShifts: 2,
    basePrice: 699
  },
  {
    id: '12hours',
    name: 'Full Day Access',
    duration: 12,
    maxShifts: 1,
    basePrice: 999
  }
];

export const STATUS_INDICATORS = [
  { status: 'Available', color: 'bg-green-100' },
  { status: 'Partially Available', color: 'bg-yellow-100' },
  { status: 'Booked', color: 'bg-red-100' }
] as const;