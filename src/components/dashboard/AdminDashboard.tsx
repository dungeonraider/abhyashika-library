import React, { useState, useEffect } from 'react';
import { UserSubscription } from '../../types/subscription';
import { User } from '../../types/auth';
import { databaseUtils } from '../../utils/database';
import { toast } from 'react-hot-toast';
import Modal from '../ui/Modal';
import SeatBlockingGrid from './SeatBlockingGrid';
import AdminControls from './AdminControls';
import AdminUserManagement from './AdminUserManagement';

export default function AdminDashboard() {
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [blockedSeats, setBlockedSeats] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeatManagementOpen, setIsSeatManagementOpen] = useState(false);

  const loadData = () => {
    try {
      const dbState = databaseUtils.getDatabaseState();
      
      // Filter out admin users and get regular users
      const regularUsers = dbState.users.filter(user => user.role === 'user');
      
      // Get all subscriptions
      const allSubscriptions = dbState.subscriptions;
      
      // Get blocked seats
      const currentBlockedSeats = dbState.blockedSeats;

      console.log('Loaded users:', regularUsers);
      console.log('Loaded subscriptions:', allSubscriptions);

      setUsers(regularUsers);
      setSubscriptions(allSubscriptions);
      setBlockedSeats(currentBlockedSeats);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Reload data every 30 seconds to keep it fresh
  useEffect(() => {
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSeatToggle = (seatNumber: number) => {
    const updatedBlockedSeats = blockedSeats.includes(seatNumber)
      ? blockedSeats.filter(seat => seat !== seatNumber)
      : [...blockedSeats, seatNumber];

    localStorage.setItem('blockedSeats', JSON.stringify(updatedBlockedSeats));
    setBlockedSeats(updatedBlockedSeats);
    toast.success(`Seat ${seatNumber} ${blockedSeats.includes(seatNumber) ? 'unblocked' : 'blocked'}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => setIsSeatManagementOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Manage Seats
          </button>
        </div>

        {/* User Management */}
        <AdminUserManagement
          users={users}
          subscriptions={subscriptions}
          onUpdate={loadData}
        />

        {/* Seat Management Modal */}
        <Modal
          isOpen={isSeatManagementOpen}
          onClose={() => setIsSeatManagementOpen(false)}
          title="Seat Management"
        >
          <SeatBlockingGrid
            blockedSeats={blockedSeats}
            onSeatToggle={handleSeatToggle}
          />
        </Modal>

        {/* Admin Controls */}
        <AdminControls />
      </div>
    </div>
  );
}