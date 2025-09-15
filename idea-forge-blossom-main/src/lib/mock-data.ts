import { Store, Rating, User } from './auth';

// Mock stores data
export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Pizza Palace Restaurant',
    email: 'contact@pizzapalace.com',
    address: '789 Store Avenue, Business District',
    averageRating: 4.2,
    totalRatings: 156,
    ownerId: '3'
  },
  {
    id: '2', 
    name: 'Coffee Corner Cafe',
    email: 'hello@coffeecorner.com',
    address: '321 Cafe Street, Downtown Area',
    averageRating: 4.8,
    totalRatings: 89,
    ownerId: '4'
  },
  {
    id: '3',
    name: 'Tech Gadgets Store',
    email: 'support@techgadgets.com', 
    address: '654 Electronics Boulevard, Tech Hub',
    averageRating: 3.9,
    totalRatings: 234,
    ownerId: '5'
  },
  {
    id: '4',
    name: 'Fashion Boutique',
    email: 'info@fashionboutique.com',
    address: '987 Style Street, Fashion District',
    averageRating: 4.5,
    totalRatings: 67,
    ownerId: '6'
  }
];

// Mock ratings data
export const mockRatings: Rating[] = [
  {
    id: '1',
    userId: '2',
    storeId: '1', 
    rating: 4,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    userId: '2',
    storeId: '2',
    rating: 5,
    createdAt: '2024-01-20'
  }
];

// Mock additional users for admin view
export const mockUsers: User[] = [
  {
    id: '2',
    name: 'John Smith Customer', 
    email: 'john@example.com',
    address: '456 Customer Lane, User City',
    role: 'user'
  },
  {
    id: '7',
    name: 'Sarah Johnson User',
    email: 'sarah@example.com', 
    address: '123 Residential Road, Suburb',
    role: 'user'
  },
  {
    id: '8',
    name: 'Mike Wilson Customer',
    email: 'mike@example.com',
    address: '789 Community Drive, Neighborhood',
    role: 'user'
  }
];

// Analytics data for admin dashboard
export const mockAnalytics = {
  totalUsers: 156,
  totalStores: 42,
  totalRatings: 1247
};