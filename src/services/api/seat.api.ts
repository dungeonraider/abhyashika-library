import { apiClient } from './client';
import { API_CONFIG } from '../../config/api';
import { TimeRange } from '../../types/seat';
import { withCache } from './withCache';

export const seatApi = {
  async checkAvailability(params: {
    seatId: number;
    timeSlot: TimeRange;
    startDate: string;
    endDate: string;
  }) {
    const queryParams = new URLSearchParams({
      seatId: params.seatId.toString(),
      timeSlot: JSON.stringify(params.timeSlot),
      startDate: params.startDate,
      endDate: params.endDate
    });

    const cacheKey = `seat-availability-${queryParams.toString()}`;
    return withCache(
      cacheKey,
      () => apiClient.get<{ success: boolean; isAvailable: boolean }>(
        `${API_CONFIG.endpoints.seats.availability}?${queryParams}`
      ),
      { ttl: 30 * 1000 } // Cache for 30 seconds
    );
  },

  async getSeatStatus(seatId: number) {
    const cacheKey = `seat-status-${seatId}`;
    return withCache(
      cacheKey,
      () => apiClient.get<{ success: boolean; status: string }>(
        `${API_CONFIG.endpoints.seats.status}?seatId=${seatId}`
      ),
      { ttl: 30 * 1000 } // Cache for 30 seconds
    );
  }
};