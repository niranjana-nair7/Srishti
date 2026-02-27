import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AddProduct from './pages/AddProduct';
import './GlobalStyles.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/portal" element={<AddProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
