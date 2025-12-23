import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminLayout from './components/layout/AdminLayout';
import UserManagement from './pages/UserManagement';
import ShopManagement from './pages/ShopManagement';

function App() {
  const [user, setUser] = useState({ name: 'Dev Admin', role: 'admin' });
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    // Auth bypass kept for now
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'dashboard';
      setActivePage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <AdminLayout activePage={activePage} onLogout={handleLogout}>
      {activePage === 'dashboard' && <Dashboard />}
      {activePage === 'users' && <UserManagement />}
      {activePage === 'shops' && <ShopManagement />}
      {activePage === 'settings' && <div className="text-white">System Settings</div>}
    </AdminLayout>
  );
}

export default App;
