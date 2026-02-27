import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav style={{ backgroundColor: 'var(--surface-color)', padding: '1rem 2rem', boxShadow: 'var(--shadow)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--primary-color)', fontWeight: 800, fontSize: '1.5rem' }}>
          <span>ArtisanWeb</span>
        </Link>
        <div className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: isActive('/') ? 'var(--accent-color)' : 'var(--text-primary)', fontWeight: 600 }}>Home</Link>
          <Link to="/portal" style={{ textDecoration: 'none', color: isActive('/portal') ? 'var(--accent-color)' : 'var(--text-primary)', fontWeight: 600 }}>Artisan Portal</Link>
          <button className="btn-primary">Join</button>
        </div>
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}>
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </div>
      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0', borderTop: '1px solid #eee', marginTop: '1rem' }}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/portal" onClick={() => setIsOpen(false)}>Portal</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
