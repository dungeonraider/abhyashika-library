import React, { useState } from 'react';
import { UserSubscription } from '../../../types/subscription';
import { SLOT_TYPES } from '../../../constants/seats';
import { subscriptionService } from '../../../services/subscriptionService';
import { seatService } from '../../../services/seatService';
import { toast } from 'react-hot-toast';
import SeatMap from '../../seat/SeatMap';
import TimeSlotSelector from '../../seat/TimeSlotSelector';

interface SubscriptionDowngradeProps {
  subscription: UserSubscription;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SubscriptionDowngrade({ subscription, onClose, onSuccess }: SubscriptionDowngradeProps) {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedSeatId, setSelectedSeatId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Plan, 2: Time/Seat

  const currentPlan = SLOT_TYPES.find(type => type.id === subscription.planType);
  const selectedSlotType = SLOT_TYPES.find(type => type.id === selectedPlan);

  const availableDowngrades = SLOT_TYPES.filter(type => {
    const currentPlanIndex = SLOT_TYPES.findIndex(t => t.id === subscription.planType);
    const downgradePlanIndex = SLOT_TYPES.findIndex(t => t.id === type.id);
    return downgradePlanIndex < currentPlanIndex;
  });

  // Calculate refund amount
  const calculateRefundAmount = (newPlan: typeof SLOT_TYPES[0]) => {
    if (!currentPlan) return 0;
    
    const remainingDays = Math.ceil(
      (new Date(subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    
    const remainingMonths = remainingDays / 30;
    const currentMonthlyRate = currentPlan.basePrice;
    const newMonthlyRate = newPlan.basePrice;
    
    return Math.ceil((currentMonthlyRate - newMonthlyRate) * remainingMonths);
  };

  const handleDowngrade = async () => {
    if (!selectedPlan) {
      toast.error('Please select a plan');
      return;
    }

    if (!selectedTimeSlot || !selectedSeatId) {
      toast.error('Please complete all selections');
      return;
    }

    setIsProcessing(true);
    try {
      // Check if keeping the same seat
      const keepingSameSeat = selectedSeatId === subscription.seatNumber;
      
      // Verify seat availability
      const isSeatAvailable = seatService.isSeatAvailable(
        selectedSeatId,
        selectedTimeSlot,
        subscription.startDate,
        subscription.endDate,
        keepingSameSeat ? subscription.id : undefined
      );

      if (!isSeatAvailable) {
        throw new Error('Selected seat is not available for the chosen time slot');
      }

      await subscriptionService.downgradeSubscription(
        subscription.id,
        selectedPlan,
        selectedTimeSlot,
        selectedSeatId
      );

      toast.success('Subscription downgraded successfully');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to downgrade subscription');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-2">Select New Plan</h3>
          {availableDowngrades.map((plan) => {
            const refundAmount = calculateRefundAmount(plan);
            
            return (
              <button
                key={plan.id}
                onClick={() => {
                  setSelectedPlan(plan.id);
                  setStep(2);
                  if (plan.id === '12hours') {
                    setSelectedTimeSlot({ start: '07:00', end: '23:00' });
                  }
                }}
                className={`
                  w-full p-4 rounded-lg text-left transition-colors
                  ${selectedPlan === plan.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-900'}
                `}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{plan.name}</div>
                    <div className="text-sm mt-1">
                      {plan.duration} hours per day
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹{plan.basePrice}/month</div>
                    {refundAmount > 0 && (
                      <div className="text-sm text-green-600">
                        Refund: ₹{refundAmount}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {step === 2 && selectedSlotType && (
        <>
          <div>
            <h3 className="text-lg font-medium mb-4">Select Time Slot & Seat</h3>
            {selectedSlotType.id !== '12hours' && (
              <TimeSlotSelector
                slotType={selectedSlotType}
                selectedTimeSlot={selectedTimeSlot}
                onTimeSlotSelect={setSelectedTimeSlot}
              />
            )}
            {(selectedTimeSlot || selectedSlotType.id === '12hours') && (
              <div className="mt-6">
                <SeatMap
                  selectedTimeSlot={selectedTimeSlot}
                  selectedSeatId={selectedSeatId}
                  onSeatSelect={setSelectedSeatId}
                  planType={selectedPlan}
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Back
            </button>
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDowngrade}
                disabled={!selectedTimeSlot || !selectedSeatId || isProcessing}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Confirm Downgrade'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}