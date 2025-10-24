import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Lazy load admin components for better performance
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireRole="admin">
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-lg">Loading admin panel...</div></div>}>
                  <AdminLayout />
                </Suspense>
              </ProtectedRoute>
            }>
              <Route index element={
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-lg">Loading dashboard...</div></div>}>
                  <AdminDashboard />
                </Suspense>
              } />
              <Route path="orders" element={<div className="p-6"><h1 className="text-2xl font-bold">Orders Management</h1><p>Manage customer orders here.</p></div>} />
              <Route path="products" element={<div className="p-6"><h1 className="text-2xl font-bold">Products Management</h1><p>Manage products here.</p></div>} />
              <Route path="customers" element={<div className="p-6"><h1 className="text-2xl font-bold">Customers Management</h1><p>Manage customers here.</p></div>} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
