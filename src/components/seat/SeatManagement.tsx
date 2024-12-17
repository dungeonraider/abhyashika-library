import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { SLOT_TYPES } from '../../constants/seats';
import { SUBSCRIPTION_PLANS } from '../../constants/subscriptions';
import { subscriptionService } from '../../services/subscriptionService';
import { toast } from 'react-hot-toast';
import { initializePayment } from '../../utils/payment';
import PlanSelector from './PlanSelector';
import SubscriptionDuration from './SubscriptionDuration';
import TimeSlotSelector from './TimeSlotSelector';
import SeatMap from './SeatMap';
import Modal from '../ui/Modal';

export default function SeatManagement() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('monthly');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ start: string; end: string } | null>(null);
  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const selectedSlotType = SLOT_TYPES.find(type => type.id === selectedPlan);
  const selectedDurationPlan = SUBSCRIPTION_PLANS.find(plan => plan.id === selectedDuration);

  // Calculate final price
  const calculateFinalPrice = () => {
    if (!selectedSlotType || !selectedDurationPlan) return 0;
    const basePrice = selectedSlotType.basePrice * selectedDurationPlan.months;
    return Math.round(basePrice * (1 - selectedDurationPlan.discount / 100));
  };

  const finalPrice = calculateFinalPrice();

  const handleConfirmBooking = async () => {
    if (!user || !selectedSlotType || !selectedDurationPlan || !selectedTimeSlot || !selectedSeatId) {
      toast.error('Please complete all selections');
      return;
    }

    setIsProcessing(true);
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + selectedDurationPlan.months);

      // Initialize payment
      await initializePayment(
        finalPrice,
        async () => {
          try {
            // Create subscription after successful payment
            await subscriptionService.createSubscription({
              userId: user.id,
              planType: selectedPlan,
              seatNumber: selectedSeatId,
              timeSlot: selectedTimeSlot,
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
              duration: selectedDurationPlan.months,
              totalAmount: finalPrice
            });

            toast.success('Booking confirmed successfully!');
            navigate('/dashboard');
          } catch (error) {
            console.error('Error creating subscription:', error);
            toast.error('Failed to create subscription. Please contact support.');
          }
        },
        {
          name: user.name,
          email: user.email,
          contact: user.mobile,
          planType: selectedSlotType.name,
          duration: selectedDurationPlan.months
        }
      );
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
      setIsConfirmModalOpen(false);
    }
  };

  const canProceed = selectedPlan && selectedDuration && selectedTimeSlot && selectedSeatId;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Book Your Seat</h1>
          {canProceed && (
            <button
              onClick={() => setIsConfirmModalOpen(true)}
              disabled={isProcessing}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 fixed top-4 right-4 z-10"
            >
              {isProcessing ? 'Processing...' : 'Confirm Booking'}
            </button>
          )}
        </div>

        {/* Plan Selection */}
        <PlanSelector
          selectedPlan={selectedPlan}
          onPlanChange={(plan) => {
            setSelectedPlan(plan);
            setSelectedTimeSlot(null);
            setSelectedSeatId(null);
          }}
        />

        {selectedPlan && (
          <>
            {/* Duration Selection */}
            <SubscriptionDuration
              selectedDuration={selectedDuration}
              onDurationChange={setSelectedDuration}
              basePrice={selectedSlotType?.basePrice || 0}
            />

            {/* Time Slot Selection */}
            {selectedSlotType && (
              <TimeSlotSelector
                slotType={selectedSlotType}
                selectedTimeSlot={selectedTimeSlot}
                onTimeSlotSelect={setSelectedTimeSlot}
              />
            )}

            {/* Seat Selection */}
            {selectedTimeSlot && (
              <SeatMap
                selectedTimeSlot={selectedTimeSlot}
                selectedSeatId={selectedSeatId}
                onSeatSelect={setSelectedSeatId}
                planType={selectedPlan}
              />
            )}
          </>
        )}

        {/* Confirmation Modal */}
        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title="Confirm Booking"
        >
          <div className="mt-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Selected Plan</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedSlotType?.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedDurationPlan?.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Time Slot</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedTimeSlot?.start} - {selectedTimeSlot?.end}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Seat Number</h3>
                <p className="mt-1 text-sm text-gray-900">#{selectedSeatId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">₹{finalPrice}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleConfirmBooking}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </button>
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}