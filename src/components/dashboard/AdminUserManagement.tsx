import React, { useState } from 'react';
import { UserSubscription } from '../../types/subscription';
import { User } from '../../types/auth';
import { subscriptionService } from '../../services/subscriptionService';
import { toast } from 'react-hot-toast';
import { formatDate } from '../../utils/date';
import { SLOT_TYPES } from '../../constants/seats';
import Modal from '../ui/Modal';
import AdminSubscriptionEdit from './subscription/AdminSubscriptionEdit';

interface AdminUserManagementProps {
  users: User[];
  subscriptions: UserSubscription[];
  onUpdate: () => void;
}

export default function AdminUserManagement({ users, subscriptions, onUpdate }: AdminUserManagementProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmCancelOpen, setIsConfirmCancelOpen] = useState(false);
  const [isConfirmReactivateOpen, setIsConfirmReactivateOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<UserSubscription | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCancelSubscription = async () => {
    if (!selectedSubscription) return;
    setIsProcessing(true);
    try {
      await subscriptionService.cancelSubscription(selectedSubscription.id);
      toast.success('Subscription cancelled successfully');
      onUpdate();
      setIsConfirmCancelOpen(false);
    } catch (error) {
      toast.error('Failed to cancel subscription');
    } finally {
      setIsProcessing(false);
      setSelectedSubscription(null);
    }
  };

  const handleReactivateSubscription = async () => {
    if (!selectedSubscription) return;
    setIsProcessing(true);
    try {
      await subscriptionService.modifySubscriptionStatus(selectedSubscription.id, 'active');
      toast.success('Subscription reactivated successfully');
      onUpdate();
      setIsConfirmReactivateOpen(false);
    } catch (error) {
      toast.error('Failed to reactivate subscription');
    } finally {
      setIsProcessing(false);
      setSelectedSubscription(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Slot</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.map(subscription => {
              const user = users.find(u => u.id === subscription.userId);
              const planType = SLOT_TYPES.find(type => type.id === subscription.planType);
              
              if (!user) return null;

              return (
                <tr key={subscription.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.mobile}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{planType?.name}</div>
                    <div className="text-sm text-gray-500">₹{subscription.totalAmount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">#{subscription.seatNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {subscription.timeSlot.start} - {subscription.timeSlot.end}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                      subscription.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(subscription.startDate)} - {formatDate(subscription.endDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {subscription.status === 'active' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedSubscription(subscription);
                              setIsEditModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSubscription(subscription);
                              setIsConfirmCancelOpen(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {subscription.status === 'cancelled' && (
                        <button
                          onClick={() => {
                            setSelectedSubscription(subscription);
                            setIsConfirmReactivateOpen(true);
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Reactivate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {selectedSubscription && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedSubscription(null);
          }}
          title="Edit User Subscription"
        >
          <AdminSubscriptionEdit
            subscription={selectedSubscription}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedSubscription(null);
            }}
            onSuccess={() => {
              onUpdate();
              setIsEditModalOpen(false);
              setSelectedSubscription(null);
            }}
          />
        </Modal>
      )}

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={isConfirmCancelOpen}
        onClose={() => {
          setIsConfirmCancelOpen(false);
          setSelectedSubscription(null);
        }}
        title="Cancel User Subscription"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Are you sure you want to cancel this user's subscription? This action cannot be undone.
          </p>
        </div>
        <div className="mt-5 flex gap-4">
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            onClick={handleCancelSubscription}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Yes, Cancel'}
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => {
              setIsConfirmCancelOpen(false);
              setSelectedSubscription(null);
            }}
          >
            No, Keep It
          </button>
        </div>
      </Modal>

      {/* Reactivate Confirmation Modal */}
      <Modal
        isOpen={isConfirmReactivateOpen}
        onClose={() => {
          setIsConfirmReactivateOpen(false);
          setSelectedSubscription(null);
        }}
        title="Reactivate User Subscription"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Are you sure you want to reactivate this user's subscription?
          </p>
        </div>
        <div className="mt-5 flex gap-4">
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            onClick={handleReactivateSubscription}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Yes, Reactivate'}
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => {
              setIsConfirmReactivateOpen(false);
              setSelectedSubscription(null);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}