import Header from "@/components/Header";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { Link, NavLink, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  HelpCircle,
  ArrowLeft,
  Zap
} from "lucide-react";
import { DashboardProvider } from "@/contexts/DashboardContext";

const AdminLayout = () => {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="flex">
            <Sidebar className="border-r-0 shadow-sm bg-white border-r border-gray-200">
            <SidebarHeader className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">AERO Admin</h2>
                    <p className="text-xs text-gray-500">Control Panel</p>
                  </div>
                </div>
                <SidebarTrigger className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-all duration-200" />
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-4">
              <SidebarGroup>
                <SidebarGroupLabel className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="group">
                        <NavLink 
                          to="/admin" 
                          end 
                          className={({ isActive }) => 
                            `flex items-center px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-gray-100 ${
                              isActive 
                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                                : 'text-gray-700 hover:text-gray-900'
                            }`
                          }
                        >
                          <LayoutDashboard className="mr-3 h-5 w-5" />
                          <span className="font-medium">Dashboard</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="group">
                        <NavLink 
                          to="/admin/orders" 
                          className={({ isActive }) => 
                            `flex items-center px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-gray-100 ${
                              isActive 
                                ? 'bg-green-50 text-green-700 border-r-2 border-green-600' 
                                : 'text-gray-700 hover:text-gray-900'
                            }`
                          }
                        >
                          <ShoppingBag className="mr-3 h-5 w-5" />
                          <span className="font-medium">Orders</span>
                          <div className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            12
                          </div>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="group">
                        <NavLink 
                          to="/admin/products" 
                          className={({ isActive }) => 
                            `flex items-center px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-gray-100 ${
                              isActive 
                                ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600' 
                                : 'text-gray-700 hover:text-gray-900'
                            }`
                          }
                        >
                          <Package className="mr-3 h-5 w-5" />
                          <span className="font-medium">Products</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="group">
                        <NavLink 
                          to="/admin/customers" 
                          className={({ isActive }) => 
                            `flex items-center px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-gray-100 ${
                              isActive 
                                ? 'bg-yellow-50 text-yellow-700 border-r-2 border-yellow-600' 
                                : 'text-gray-700 hover:text-gray-900'
                            }`
                          }
                        >
                          <Users className="mr-3 h-5 w-5" />
                          <span className="font-medium">Customers</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarSeparator className="my-6 bg-gray-200" />

              <SidebarGroup>
                <SidebarGroupLabel className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">
                  Analytics
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="group">
                        <NavLink 
                          to="/admin/analytics" 
                          className={({ isActive }) => 
                            `flex items-center px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-gray-100 ${
                              isActive 
                                ? 'bg-gray-50 text-gray-700 border-r-2 border-gray-600' 
                                : 'text-gray-700 hover:text-gray-900'
                            }`
                          }
                        >
                          <BarChart3 className="mr-3 h-5 w-5" />
                          <span className="font-medium">Analytics</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="group">
                        <NavLink 
                          to="/admin/reports" 
                          className={({ isActive }) => 
                            `flex items-center px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-gray-100 ${
                              isActive 
                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                                : 'text-gray-700 hover:text-gray-900'
                            }`
                          }
                        >
                          <FileText className="mr-3 h-5 w-5" />
                          <span className="font-medium">Reports</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarSeparator className="my-6 bg-gray-200" />

              <SidebarGroup>
                <SidebarGroupLabel className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">
                  System
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="group">
                        <NavLink 
                          to="/admin/settings" 
                          className={({ isActive }) => 
                            `flex items-center px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-gray-100 ${
                              isActive 
                                ? 'bg-gray-50 text-gray-700 border-r-2 border-gray-600' 
                                : 'text-gray-700 hover:text-gray-900'
                            }`
                          }
                        >
                          <Settings className="mr-3 h-5 w-5" />
                          <span className="font-medium">Settings</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="group">
                        <NavLink 
                          to="/admin/help" 
                          className={({ isActive }) => 
                            `flex items-center px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-gray-100 ${
                              isActive 
                                ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600' 
                                : 'text-gray-700 hover:text-gray-900'
                            }`
                          }
                        >
                          <HelpCircle className="mr-3 h-5 w-5" />
                          <span className="font-medium">Help & Support</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="p-4 border-t border-gray-200">
              <Link 
                to="/" 
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
              >
                <ArrowLeft className="mr-3 h-4 w-4 group-hover:translate-x-[-2px] transition-transform duration-200" />
                <span className="font-medium">Back to site</span>
              </Link>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
          
            <SidebarInset className="bg-gray-50">
              <Outlet />
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </DashboardProvider>
  );
};

export default AdminLayout;


