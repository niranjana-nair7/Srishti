import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();

  return (
    <nav style={{ 
      position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1000, 
      backgroundColor: 'rgba(249, 247, 242, 0.9)', 
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0,0,0,0.03)',
      padding: '1.5rem 3rem'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '35px', height: '35px', background: 'var(--primary-color)', borderRadius: '50%' }}></div>
          <span style={{ 
            fontFamily: 'Playfair Display', fontSize: '1.1rem', fontWeight: 900, 
            letterSpacing: '1.5px', color: 'var(--secondary-color)', textTransform: 'uppercase' 
          }}>ARTISAN PORTAL</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {/* COMMON LINKS */}
          <Link to="/" style={{ 
            textDecoration: 'none', fontSize: '0.75rem', fontWeight: 800, 
            letterSpacing: '1px', color: location.pathname === '/' ? 'var(--primary-color)' : 'var(--secondary-color)',
            textTransform: 'uppercase'
          }}>
            Marketplace
          </Link>
          <Link to="/about" style={{ 
            textDecoration: 'none', fontSize: '0.75rem', fontWeight: 800, 
            letterSpacing: '1px', color: location.pathname === '/about' ? 'var(--primary-color)' : 'var(--secondary-color)',
            textTransform: 'uppercase'
          }}>
            About
          </Link>

          {/* ARTISAN SECTION */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '20px', borderLeft: '1px solid #ddd', paddingLeft: '30px' }}>
              <Link to="/portal" style={{ 
                textDecoration: 'none', fontSize: '0.75rem', fontWeight: 800, 
                letterSpacing: '1px', color: location.pathname === '/portal' ? 'var(--primary-color)' : 'var(--secondary-color)',
                textTransform: 'uppercase'
              }}>
                Add Product
              </Link>
              <Link to="/orders" style={{ 
                textDecoration: 'none', fontSize: '0.75rem', fontWeight: 800, 
                letterSpacing: '1px', color: location.pathname === '/orders' ? 'var(--primary-color)' : 'var(--secondary-color)',
                textTransform: 'uppercase'
              }}>
                My Orders
              </Link>
              <button 
                onClick={onLogout}
                style={{ 
                  background: 'none', fontSize: '0.75rem', fontWeight: 800, 
                  color: '#888', textTransform: 'uppercase', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '5px'
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ 
              textDecoration: 'none', fontSize: '0.75rem', fontWeight: 800, 
              letterSpacing: '1px', color: 'var(--primary-color)', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid var(--primary-color)',
              padding: '10px 20px', borderRadius: '30px'
            }}>
              <User size={16} /> Artisan Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
