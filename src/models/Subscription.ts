import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  planType: { 
    type: String, 
    required: true,
    enum: ['4hours', '6hours', '8hours', '12hours']
  },
  seatNumber: { 
    type: Number, 
    required: true,
    min: 1,
    max: 150
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  timeSlot: {
    start: { 
      type: String, 
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
    },
    end: { 
      type: String, 
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
    }
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled', 'pending', 'modified', 'upgraded'],
    default: 'active'
  },
  duration: { 
    type: Number, 
    required: true,
    min: 1,
    max: 12
  },
  totalAmount: { 
    type: Number, 
    required: true,
    min: 0
  },
  modifiedAt: Date,
  cancelledAt: Date,
  modifiedFrom: String,
  upgradedFrom: String
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for better query performance
subscriptionSchema.index({ userId: 1, status: 1 });
subscriptionSchema.index({ seatNumber: 1, status: 1 });

export const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);