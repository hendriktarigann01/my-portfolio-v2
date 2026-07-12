export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceSub?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  waText: string;
  videoSrc?: string;
}

