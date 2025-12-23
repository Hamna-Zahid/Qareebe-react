import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import ShopOwnerSignup from './pages/ShopOwnerSignup';
import ShopOnboarding1_Business from './pages/ShopOnboarding1_Business';
import ShopOnboarding2_Location from './pages/ShopOnboarding2_Location';
import ShopOnboarding3_Details from './pages/ShopOnboarding3_Details';
import ShopOwnerLayout from './components/layout/ShopOwnerLayout';
import ShopDashboard from './pages/ShopDashboard';
import ShopOrders from './pages/ShopOrders';
import ShopProducts from './pages/ShopProducts';
import ShopSettings from './pages/ShopSettings';
import AddProduct from './pages/AddProduct';
import MobileContainer from './components/layout/MobileContainer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MobileContainer>
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<ShopOwnerSignup />} />
            <Route path="/login" element={<Navigate to="/signup" />} /> {/* Quick redirect for now */}
            <Route path="/onboarding/business" element={<ShopOnboarding1_Business />} />
            <Route path="/onboarding/location" element={<ShopOnboarding2_Location />} />
            <Route path="/onboarding/details" element={<ShopOnboarding3_Details />} />

            {/* Dashboard Routes */}
            <Route path="/" element={<ShopOwnerLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<ShopDashboard />} />
              <Route path="orders" element={<ShopOrders />} />
              <Route path="products" element={<ShopProducts />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="settings" element={<ShopSettings />} />
            </Route>
          </Routes>
        </MobileContainer>
      </Router>
    </AuthProvider>
  );
}

export default App;
