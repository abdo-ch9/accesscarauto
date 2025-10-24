import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus,
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  LineChart,
  RefreshCw,
  Loader2
} from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";
import { 
  formatCurrency, 
  formatNumber, 
  formatPercentage, 
  formatTimeAgo, 
  getStatusColor, 
  getStatusIcon,
  calculateChartHeight,
  getChartMaxValue
} from "@/lib/dashboardUtils";

const AdminDashboard = () => {
  const { data, loading, error, refreshData } = useDashboard();

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-600" />
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={refreshData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's what's happening with your store today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={refreshData}
                variant="outline"
                size="sm"
                disabled={loading}
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatTimeAgo(data.lastUpdated)}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">

        {/* Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total Orders Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(data.metrics.totalOrders)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+{formatPercentage(data.metrics.ordersGrowth)}</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Customers Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Customers</p>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(data.metrics.totalCustomers)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+{formatPercentage(data.metrics.customersGrowth)}</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Products</p>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(data.metrics.totalProducts)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+{data.metrics.productsGrowth.toFixed(0)} new</span>
                  <span className="text-sm text-gray-500 ml-1">this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Revenue</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(data.metrics.revenue)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+{formatPercentage(data.metrics.revenueGrowth)}</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Recent Orders - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                  <p className="text-sm text-gray-600 mt-1">Latest customer orders and their status</p>
                </div>
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-50">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {data.recentOrders.slice(0, 3).map((order) => {
                  const statusColors = getStatusColor(order.status);
                  const StatusIcon = getStatusIcon(order.status) === 'CheckCircle' ? CheckCircle : 
                                   getStatusIcon(order.status) === 'Clock' ? Clock : AlertCircle;
                  
                  return (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${statusColors.bgIcon} rounded-full flex items-center justify-center`}>
                          <StatusIcon className={`h-5 w-5 ${statusColors.icon}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                          <p className="text-sm text-gray-600">{order.customerEmail}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <span className="text-xs text-gray-500">{formatTimeAgo(order.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(order.amount)}</p>
                        <p className="text-sm text-gray-600">{order.items} item{order.items > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions - Takes 1 column */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <p className="text-sm text-gray-600 mt-1">Common admin tasks</p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <Button className="w-full justify-start bg-gray-900 hover:bg-gray-800 text-white">
                  <Eye className="h-4 w-4 mr-3" />
                  View All Orders
                </Button>
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                  <Package className="h-4 w-4 mr-3" />
                  Manage Products
                </Button>
                <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
                  <Users className="h-4 w-4 mr-3" />
                  Customer Support
                </Button>
                <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="h-4 w-4 mr-3" />
                  Add New Product
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-gray-600" />
                    Sales Overview
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Monthly sales performance</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Last 6 months
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Simple bar chart representation */}
                <div className="flex items-end justify-between h-48 space-x-2">
                  {data.charts.sales.map((item, index) => {
                    const maxValue = getChartMaxValue(data.charts.sales);
                    const height = calculateChartHeight(item.value, maxValue);
                    const isCurrentMonth = index === data.charts.sales.length - 1;
                    
                    return (
                      <div key={item.month} className="flex flex-col items-center space-y-2">
                        <div 
                          className={`w-8 rounded-t ${isCurrentMonth ? 'bg-blue-500' : 'bg-gray-300'}`}
                          style={{height}}
                        ></div>
                        <span className="text-xs text-gray-600">{item.month}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{formatCurrency(Math.min(...data.charts.sales.map(item => item.value)))}</span>
                  <span>{formatCurrency(Math.max(...data.charts.sales.map(item => item.value)))}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Growth Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <LineChart className="h-5 w-5 mr-2 text-green-600" />
                    Customer Growth
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">New customer registrations</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  +23% this month
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Simple line chart representation */}
                <div className="relative h-48">
                  <svg className="w-full h-full" viewBox="0 0 300 120">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.8"/>
                      </linearGradient>
                    </defs>
                    <path
                      d="M 20 100 Q 60 80 100 70 T 180 50 T 260 30"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      fill="none"
                      className="drop-shadow-sm"
                    />
                    <circle cx="20" cy="100" r="4" fill="#10b981" />
                    <circle cx="60" cy="80" r="4" fill="#10b981" />
                    <circle cx="100" cy="70" r="4" fill="#10b981" />
                    <circle cx="140" cy="60" r="4" fill="#10b981" />
                    <circle cx="180" cy="50" r="4" fill="#10b981" />
                    <circle cx="220" cy="40" r="4" fill="#10b981" />
                    <circle cx="260" cy="30" r="4" fill="#10b981" />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{Math.min(...data.charts.customerGrowth.map(item => item.value))} new</span>
                  <span>{Math.max(...data.charts.customerGrowth.map(item => item.value))} new</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Today's Activity</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Orders</span>
                <span className="font-semibold text-gray-900">{data.activity.newOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-semibold text-gray-900">{data.activity.completed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-semibold text-gray-900">{formatCurrency(data.activity.revenue)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="font-semibold text-blue-600">{data.performance.conversionRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg. Order Value</span>
                <span className="font-semibold text-blue-600">{formatCurrency(data.performance.avgOrderValue)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Customer Satisfaction</span>
                <span className="font-semibold text-blue-600">{data.performance.customerSatisfaction.toFixed(1)}/5</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Support</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Open Tickets</span>
                <span className="font-semibold text-purple-600">{data.support.openTickets}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Resolved Today</span>
                <span className="font-semibold text-purple-600">{data.support.resolvedToday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg. Response</span>
                <span className="font-semibold text-purple-600">{data.support.avgResponseTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
