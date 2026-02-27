import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, LayoutGrid } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav style={{ 
      position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1000, 
      backgroundColor: 'rgba(249, 247, 242, 0.9)', 
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0,0,0,0.03)',
      padding: '2rem 3rem'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--primary-color)', borderRadius: '50%' }}></div>
          <span style={{ 
            fontFamily: 'Playfair Display', fontSize: '1.25rem', fontWeight: 900, 
            letterSpacing: '2px', color: 'var(--secondary-color)', textTransform: 'uppercase' 
          }}>ARTISAN PORTAL</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <Link to="/portal" style={{ 
            textDecoration: 'none', fontSize: '0.75rem', fontWeight: 800, 
            letterSpacing: '2px', color: location.pathname === '/portal' ? 'var(--primary-color)' : 'var(--secondary-color)',
            textTransform: 'uppercase'
          }}>
            The Portal
          </Link>
          <a href="#" style={{ 
            textDecoration: 'none', fontSize: '0.75rem', fontWeight: 800, 
            letterSpacing: '2px', color: 'var(--secondary-color)', textTransform: 'uppercase'
          }}>
            Collective
          </a>
          <div style={{ position: 'relative' }}>
             <ShoppingBag size={20} color="var(--secondary-color)" style={{ cursor: 'pointer' }} />
             <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary-color)', color: 'white', width: '16px', height: '16px', borderRadius: '50%', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>0</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
