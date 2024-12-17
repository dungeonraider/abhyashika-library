import { VercelRequest, VercelResponse } from '@vercel/node';
import { seatService } from '../../src/services/seatService';
import { handleError } from '../../src/utils/errors/errorHandler';

export async function checkAvailability(req: VercelRequest, res: VercelResponse) {
  try {
    const { seatId, timeSlot, startDate, endDate } = req.query;
    const isAvailable = seatService.isSeatAvailable(
      Number(seatId),
      JSON.parse(timeSlot as string),
      startDate as string,
      endDate as string
    );
    return res.status(200).json({ success: true, isAvailable });
  } catch (error) {
    handleError(error);
    return res.status(500).json({ success: false, message: 'Failed to check availability' });
  }
}

export async function getSeatStatus(req: VercelRequest, res: VercelResponse) {
  try {
    const { seatId } = req.query;
    const status = seatService.getSeatStatus(Number(seatId));
    return res.status(200).json({ success: true, status });
  } catch (error) {
    handleError(error);
    return res.status(500).json({ success: false, message: 'Failed to get seat status' });
  }
}