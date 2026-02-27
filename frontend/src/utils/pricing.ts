export interface PricingParams {
  materialCost: number;
  laborHours: number;
  livingWage: number;
  tier: 'local' | 'retail' | 'premium';
}

const TIER_MULTIPLIERS = {
  local: 1.1,     // 10% markup
  retail: 1.5,    // 50% markup
  premium: 2.5,   // 150% markup
};

/**
 * Dignity-First Pricing Calculator
 * Price = (Material Cost + (Labor Hours * Local Living Wage)) * Market Multiplier
 */
export const calculatePrice = ({ materialCost, laborHours, livingWage, tier }: PricingParams): number => {
  const basePrice = materialCost + (laborHours * livingWage);
  const multiplier = TIER_MULTIPLIERS[tier];
  return Math.ceil(basePrice * multiplier);
};
