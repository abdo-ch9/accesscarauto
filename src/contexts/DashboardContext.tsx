import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for dashboard data
export interface DashboardMetrics {
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenue: number;
  ordersGrowth: number;
  customersGrowth: number;
  productsGrowth: number;
  revenueGrowth: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  amount: number;
  items: number;
  status: 'completed' | 'processing' | 'pending';
  createdAt: string;
}

export interface ActivityStats {
  newOrders: number;
  completed: number;
  revenue: number;
}

export interface PerformanceStats {
  conversionRate: number;
  avgOrderValue: number;
  customerSatisfaction: number;
}

export interface SupportStats {
  openTickets: number;
  resolvedToday: number;
  avgResponseTime: string;
}

export interface ChartData {
  sales: Array<{ month: string; value: number }>;
  customerGrowth: Array<{ week: string; value: number }>;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  recentOrders: Order[];
  activity: ActivityStats;
  performance: PerformanceStats;
  support: SupportStats;
  charts: ChartData;
  lastUpdated: string;
}

interface DashboardContextType {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Mock data generator
const generateMockData = (): DashboardData => {
  const now = new Date();
  const lastUpdated = now.toISOString();
  
  return {
    metrics: {
      totalOrders: Math.floor(Math.random() * 2000) + 1000,
      totalCustomers: Math.floor(Math.random() * 1000) + 500,
      totalProducts: Math.floor(Math.random() * 200) + 80,
      revenue: Math.floor(Math.random() * 100000) + 40000,
      ordersGrowth: Math.random() * 30 + 10,
      customersGrowth: Math.random() * 25 + 8,
      productsGrowth: Math.random() * 15 + 2,
      revenueGrowth: Math.random() * 20 + 12,
    },
    recentOrders: [
      {
        id: '1',
        orderNumber: '#1234',
        customerEmail: 'john@example.com',
        amount: 299.99,
        items: 3,
        status: 'completed',
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        orderNumber: '#1233',
        customerEmail: 'jane@example.com',
        amount: 149.99,
        items: 2,
        status: 'processing',
        createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        orderNumber: '#1232',
        customerEmail: 'mike@example.com',
        amount: 89.99,
        items: 1,
        status: 'pending',
        createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        orderNumber: '#1231',
        customerEmail: 'sarah@example.com',
        amount: 199.99,
        items: 2,
        status: 'completed',
        createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        orderNumber: '#1230',
        customerEmail: 'alex@example.com',
        amount: 79.99,
        items: 1,
        status: 'processing',
        createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
      },
    ],
    activity: {
      newOrders: Math.floor(Math.random() * 20) + 8,
      completed: Math.floor(Math.random() * 15) + 5,
      revenue: Math.floor(Math.random() * 5000) + 2000,
    },
    performance: {
      conversionRate: Math.random() * 2 + 2.5,
      avgOrderValue: Math.floor(Math.random() * 100) + 150,
      customerSatisfaction: Math.random() * 0.5 + 4.5,
    },
    support: {
      openTickets: Math.floor(Math.random() * 10) + 3,
      resolvedToday: Math.floor(Math.random() * 20) + 8,
      avgResponseTime: `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 9) + 1}h`,
    },
    charts: {
      sales: [
        { month: 'Jan', value: Math.floor(Math.random() * 20000) + 25000 },
        { month: 'Feb', value: Math.floor(Math.random() * 20000) + 30000 },
        { month: 'Mar', value: Math.floor(Math.random() * 20000) + 35000 },
        { month: 'Apr', value: Math.floor(Math.random() * 20000) + 28000 },
        { month: 'May', value: Math.floor(Math.random() * 20000) + 40000 },
        { month: 'Jun', value: Math.floor(Math.random() * 20000) + 45000 },
      ],
      customerGrowth: [
        { week: 'Week 1', value: Math.floor(Math.random() * 30) + 45 },
        { week: 'Week 2', value: Math.floor(Math.random() * 30) + 55 },
        { week: 'Week 3', value: Math.floor(Math.random() * 30) + 65 },
        { week: 'Week 4', value: Math.floor(Math.random() * 30) + 75 },
      ],
    },
    lastUpdated,
  };
};

// Mock API functions
const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return generateMockData();
};

const updateOrderStatusAPI = async (orderId: string, status: Order['status']): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Order ${orderId} status updated to ${status}`);
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);
      const newData = await fetchDashboardData();
      setData(newData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await updateOrderStatusAPI(orderId, status);
      
      // Update local state
      if (data) {
        const updatedOrders = data.recentOrders.map(order =>
          order.id === orderId ? { ...order, status } : order
        );
        setData({ ...data, recentOrders: updatedOrders });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order status');
    }
  };

  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const value: DashboardContextType = {
    data,
    loading,
    error,
    refreshData,
    updateOrderStatus,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
