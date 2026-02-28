import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import Marketplace from './pages/Marketplace';
import Orders from './pages/Orders';
import Login from './pages/Login';
import './GlobalStyles.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('artisanAuth'));

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem('artisanAuth');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/about" element={<LandingPage />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route 
              path="/portal" 
              element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/orders" 
              element={isAuthenticated ? <Orders /> : <Navigate to="/login" />} 
            />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
