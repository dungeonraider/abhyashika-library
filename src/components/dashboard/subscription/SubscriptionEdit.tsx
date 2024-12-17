import React, { useState } from 'react';
import { UserSubscription } from '../../../types/subscription';
import { SLOT_TYPES } from '../../../constants/seats';
import { subscriptionService } from '../../../services/subscriptionService';
import { toast } from 'react-hot-toast';
import TimeSlotSelector from '../../seat/TimeSlotSelector';
import SeatMap from '../../seat/SeatMap';
import Modal from '../../ui/Modal';

interface SubscriptionEditProps {
  subscription: UserSubscription;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SubscriptionEdit({ subscription, onClose, onSuccess }: SubscriptionEditProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(subscription.timeSlot);
  const [selectedSeatId, setSelectedSeatId] = useState(subscription.seatNumber);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [step, setStep] = useState(1); // 1: Time, 2: Seat

  const slotType = SLOT_TYPES.find(type => type.id === subscription.planType);

  const handleSave = async () => {
    if (!selectedTimeSlot || !selectedSeatId) {
      toast.error('Please complete all selections');
      return;
    }

    setIsProcessing(true);
    try {
      await subscriptionService.modifySubscription(subscription.id, {
        timeSlot: selectedTimeSlot,
        seatNumber: selectedSeatId
      });
      toast.success('Subscription updated successfully');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update subscription');
    } finally {
      setIsProcessing(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {step === 1 && slotType && (
          <div>
            <h3 className="text-lg font-medium mb-4">Select New Time Slot</h3>
            <TimeSlotSelector
              slotType={slotType}
              selectedTimeSlot={selectedTimeSlot}
              onTimeSlotSelect={(slot) => {
                setSelectedTimeSlot(slot);
                setStep(2);
              }}
            />
          </div>
        )}

        {step === 2 && selectedTimeSlot && (
          <>
            <div>
              <h3 className="text-lg font-medium mb-4">Select New Seat</h3>
              <SeatMap
                selectedTimeSlot={selectedTimeSlot}
                selectedSeatId={selectedSeatId}
                onSeatSelect={setSelectedSeatId}
                planType={subscription.planType}
              />
            </div>

            <div className="flex justify-between mt-6">
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
                  onClick={() => setShowConfirmModal(true)}
                  disabled={!selectedSeatId || selectedSeatId === subscription.seatNumber}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Confirm Changes
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Changes"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Are you sure you want to update your subscription with the following changes?
          </p>
          <div className="mt-4 space-y-2">
            <p><strong>New Time Slot:</strong> {selectedTimeSlot?.start} - {selectedTimeSlot?.end}</p>
            <p><strong>New Seat Number:</strong> {selectedSeatId}</p>
          </div>
        </div>
        <div className="mt-5 flex gap-4">
          <button
            onClick={handleSave}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Confirm'}
          </button>
          <button
            onClick={() => setShowConfirmModal(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}