export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: 'admin' | 'user' | 'store_owner';
  storeId?: string;
}

export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  averageRating: number;
  totalRatings: number;
  ownerId: string;
}

export interface Rating {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  createdAt: string;
}

// Mock authentication - in real app this would connect to backend
class AuthService {
  private currentUser: User | null = null;

  // Mock users for demonstration
  private users: User[] = [
    {
      id: '1',
      name: 'System Administrator',
      email: 'admin@storerating.com',
      address: '123 Admin Street, Admin City',
      role: 'admin'
    },
    {
      id: '2', 
      name: 'John Smith Customer',
      email: 'john@example.com',
      address: '456 Customer Lane, User City',
      role: 'user'
    },
    {
      id: '3',
      name: 'Pizza Palace Owner',
      email: 'owner@pizzapalace.com', 
      address: '789 Store Avenue, Business District',
      role: 'store_owner',
      storeId: '1'
    }
  ];

  login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email);
        if (user && password === 'Password123!') {
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  register(userData: Omit<User, 'id' | 'role'>): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          ...userData,
          id: Math.random().toString(36),
          role: 'user'
        };
        this.users.push(newUser);
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        resolve(newUser);
      }, 1000);
    });
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  updatePassword(newPassword: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In real app, would update backend
        resolve();
      }, 1000);
    });
  }
}

export const authService = new AuthService();