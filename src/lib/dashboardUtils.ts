// Utility functions for dashboard data formatting and calculations

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: 'text-green-600',
        bgIcon: 'bg-green-100',
      };
    case 'processing':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: 'text-blue-600',
        bgIcon: 'bg-blue-100',
      };
    case 'pending':
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
        bgIcon: 'bg-yellow-100',
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        icon: 'text-gray-600',
        bgIcon: 'bg-gray-100',
      };
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return 'CheckCircle';
    case 'processing':
      return 'Clock';
    case 'pending':
      return 'AlertCircle';
    default:
      return 'AlertCircle';
  }
};

export const calculateChartHeight = (value: number, maxValue: number): string => {
  return `${(value / maxValue) * 100}%`;
};

export const getChartMaxValue = (data: Array<{ value: number }>): number => {
  return Math.max(...data.map(item => item.value));
};
