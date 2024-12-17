import React, { useState } from 'react';
import { UserSubscription } from '../../../types/subscription';
import { SLOT_TYPES } from '../../../constants/seats';
import { subscriptionService } from '../../../services/subscriptionService';
import { toast } from 'react-hot-toast';
import TimeSlotSelector from '../../seat/TimeSlotSelector';
import SeatMap from '../../seat/SeatMap';

interface AdminSubscriptionEditProps {
  subscription: UserSubscription;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminSubscriptionEdit({ subscription, onClose, onSuccess }: AdminSubscriptionEditProps) {
  const [selectedPlan, setSelectedPlan] = useState(subscription.planType);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(subscription.timeSlot);
  const [selectedSeatId, setSelectedSeatId] = useState(subscription.seatNumber);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedSlotType = SLOT_TYPES.find(type => type.id === selectedPlan);

  const handleSave = async () => {
    if (!selectedTimeSlot || !selectedSeatId) {
      toast.error('Please complete all selections');
      return;
    }

    setIsProcessing(true);
    try {
      await subscriptionService.modifySubscription(subscription.id, {
        planType: selectedPlan,
        timeSlot: selectedTimeSlot,
        seatNumber: selectedSeatId
      });
      toast.success('Subscription updated successfully');
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update subscription');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Plan Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Select Plan</h3>
        <div className="grid grid-cols-2 gap-4">
          {SLOT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setSelectedPlan(type.id);
                if (type.id === '12hours') {
                  setSelectedTimeSlot({ start: '07:00', end: '23:00' });
                }
              }}
              className={`
                p-4 rounded-lg text-center transition-colors
                ${selectedPlan === type.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-900'}
              `}
            >
              <div className="font-medium">{type.name}</div>
              <div className="text-sm mt-1">{type.duration} hours per day</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      {selectedSlotType && selectedSlotType.id !== '12hours' && (
        <TimeSlotSelector
          slotType={selectedSlotType}
          selectedTimeSlot={selectedTimeSlot}
          onTimeSlotSelect={setSelectedTimeSlot}
        />
      )}

      {/* Seat Selection */}
      {selectedTimeSlot && (
        <div>
          <h3 className="text-lg font-medium mb-4">Select Seat</h3>
          <SeatMap
            selectedTimeSlot={selectedTimeSlot}
            selectedSeatId={selectedSeatId}
            onSeatSelect={setSelectedSeatId}
            planType={selectedPlan}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!selectedTimeSlot || !selectedSeatId || isProcessing}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isProcessing ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}