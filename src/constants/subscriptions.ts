export const SUBSCRIPTION_PLANS = [
  { 
    id: 'monthly', 
    name: '1 Month', 
    months: 1, 
    discount: 0 
  },
  { 
    id: 'quarterly', 
    name: '3 Months', 
    months: 3, 
    discount: 10 
  },
  { 
    id: 'biannual', 
    name: '6 Months', 
    months: 6, 
    discount: 15 
  },
  { 
    id: 'annual', 
    name: '12 Months', 
    months: 12, 
    discount: 20 
  }
] as const;

export const calculateDiscountedPrice = (basePrice: number, discountPercentage: number): number => {
  const discount = (basePrice * discountPercentage) / 100;
  return Math.round(basePrice - discount);
};