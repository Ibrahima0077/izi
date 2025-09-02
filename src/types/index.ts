export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  clientCode: string;
  loyaltyPoints: number;
  createdAt: string;
}

export interface Convoy {
  id: string;
  departureDate: string;
  pricePerKg: number;
  carrierAddress: string;
  carrierName: string;
  destination: string;
  availableSpace: number;
}

export interface LoyaltyTransaction {
  id: string;
  userId: string;
  points: number;
  type: 'earned' | 'spent';
  description: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'pending' | 'answered';
  date: string;
}