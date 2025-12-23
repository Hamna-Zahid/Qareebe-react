import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import AppShell from './components/layout/AppShell';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ShopDetails from './pages/ShopDetails';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import TrackOrder from './pages/TrackOrder';
import Orders from './pages/Orders';
import Addresses from './pages/Addresses';
// Temporarily disabled shop owner routes - will be in separate app
// import ShopOwnerSignup from './pages/shop-owner/ShopOwnerSignup';
// import ShopOnboarding1_Business from './pages/shop-owner/ShopOnboarding1_Business';
// import ShopOnboarding2_Location from './pages/shop-owner/ShopOnboarding2_Location';
// import ShopOnboarding3_Details from './pages/shop-owner/ShopOnboarding3_Details';
// import ShopOwnerLayout from './components/layout/ShopOwnerLayout';
// import ShopDashboard from './pages/shop-owner/ShopDashboard';
// import ShopOrders from './pages/shop-owner/ShopOrders';
// import ShopProducts from './pages/shop-owner/ShopProducts';
import Settings from './pages/Settings';

// Layout for Auth/Onboarding pages (no bottom nav)
const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Routes>
              {/* Auth & Onboarding Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Shop Owner Routes - Temporarily Disabled */}
                {/* <Route path="/shop-owner/signup" element={<ShopOwnerSignup />} /> */}
                {/* <Route path="/shop-owner/onboarding/business" element={<ShopOnboarding1_Business />} /> */}
                {/* <Route path="/shop-owner/onboarding/location" element={<ShopOnboarding2_Location />} /> */}
                {/* <Route path="/shop-owner/onboarding/details" element={<ShopOnboarding3_Details />} /> */}

                <Route path="/shop/:id" element={<ShopDetails />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/addresses" element={<Addresses />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              {/* Shop Owner Dashboard - Temporarily Disabled */}
              {/* <Route path="/shop-owner" element={<ShopOwnerLayout />}> */}
              {/*   <Route path="dashboard" element={<ShopDashboard />} /> */}
              {/*   <Route path="orders" element={<ShopOrders />} /> */}
              {/*   <Route path="products" element={<ShopProducts />} /> */}
              {/* </Route> */}

              {/* Main App Routes with Bottom Nav */}
              <Route element={<AppShell />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </Router>
        </DataProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
