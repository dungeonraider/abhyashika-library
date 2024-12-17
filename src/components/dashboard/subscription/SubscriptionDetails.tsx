import React, { useState } from 'react';
import { UserSubscription } from '../../../types/subscription';
import { subscriptionService } from '../../../services/subscriptionService';
import { toast } from 'react-hot-toast';
import { Edit2, XCircle, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import Modal from '../../ui/Modal';
import SubscriptionInfo from './SubscriptionInfo';
import RenewalStatus from './RenewalStatus';
import SubscriptionEdit from './SubscriptionEdit';
import SubscriptionUpgrade from './SubscriptionUpgrade';
import SubscriptionDowngrade from './SubscriptionDowngrade';

interface SubscriptionDetailsProps {
  subscription: UserSubscription;
  onUpdate?: () => void;
}

export default function SubscriptionDetails({ subscription, onUpdate }: SubscriptionDetailsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isDowngradeModalOpen, setIsDowngradeModalOpen] = useState(false);
  const [isConfirmCancelOpen, setIsConfirmCancelOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const daysToExpiry = Math.ceil(
    (new Date(subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const canModifyPlan = daysToExpiry <= 5;

  const handleCancel = async () => {
    setIsProcessing(true);
    try {
      await subscriptionService.cancelSubscription(subscription.id);
      toast.success('Subscription cancelled successfully');
      onUpdate?.();
      setIsConfirmCancelOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to cancel subscription');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">Current Subscription</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-blue-600 hover:text-blue-700"
            title="Edit subscription"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsUpgradeModalOpen(true)}
            disabled={!canModifyPlan}
            className="text-green-600 hover:text-green-700 disabled:opacity-50"
            title={canModifyPlan ? "Upgrade plan" : "Can only modify plan within 5 days of expiry"}
          >
            <ArrowUpCircle className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsDowngradeModalOpen(true)}
            disabled={!canModifyPlan}
            className="text-yellow-600 hover:text-yellow-700 disabled:opacity-50"
            title={canModifyPlan ? "Downgrade plan" : "Can only modify plan within 5 days of expiry"}
          >
            <ArrowDownCircle className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsConfirmCancelOpen(true)}
            className="text-red-600 hover:text-red-700"
            title="Cancel subscription"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <SubscriptionInfo subscription={subscription} />
      <RenewalStatus subscription={subscription} />

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Subscription"
      >
        <SubscriptionEdit
          subscription={subscription}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={onUpdate}
        />
      </Modal>

      {/* Upgrade Modal */}
      <Modal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        title="Upgrade Subscription"
      >
        <SubscriptionUpgrade
          subscription={subscription}
          onClose={() => setIsUpgradeModalOpen(false)}
          onSuccess={onUpdate}
        />
      </Modal>

      {/* Downgrade Modal */}
      <Modal
        isOpen={isDowngradeModalOpen}
        onClose={() => setIsDowngradeModalOpen(false)}
        title="Downgrade Subscription"
      >
        <SubscriptionDowngrade
          subscription={subscription}
          onClose={() => setIsDowngradeModalOpen(false)}
          onSuccess={onUpdate}
        />
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={isConfirmCancelOpen}
        onClose={() => setIsConfirmCancelOpen(false)}
        title="Cancel Subscription"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Are you sure you want to cancel your subscription? This action cannot be undone.
          </p>
        </div>
        <div className="mt-5 flex gap-4">
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            onClick={handleCancel}
            disabled={isProcessing}
          >
            {isProcessing ? 'Cancelling...' : 'Yes, Cancel'}
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => setIsConfirmCancelOpen(false)}
          >
            No, Keep It
          </button>
        </div>
      </Modal>
    </div>
  );
}