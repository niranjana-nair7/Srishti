import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Mic, ArrowRight, UserCircle, Store } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--primary-color)', marginBottom: '1rem', display: 'block' }}>Dignity-First Marketplace</span>
        
        <h1 style={{ fontSize: 'calc(3rem + 2vw)', color: 'var(--secondary-color)', lineHeight: 1.1, marginBottom: '3rem' }}>
          Traditional Craft.<br />
          <span style={{ color: 'var(--primary-color)' }}>Modern Opportunity.</span>
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          {/* ARTISAN PATH */}
          <div 
            className="card" 
            style={{ 
              padding: '3rem', cursor: 'pointer', transition: 'all 0.4s ease',
              border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}
            onClick={() => navigate('/portal')}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ background: '#fff5f5', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Mic size={36} color="var(--primary-color)" />
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>I am an Artisan</h2>
            <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.95rem' }}>
              List your work in seconds using Malayalam voice notes. Let AI handle the cataloging and pricing.
            </p>
            <button className="btn-primary" style={{ width: '100%', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              Enter Portal <ArrowRight size={18} />
            </button>
          </div>

          {/* BUYER PATH */}
          <div 
            className="card" 
            style={{ 
              padding: '3rem', cursor: 'pointer', transition: 'all 0.4s ease',
              border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}
            onClick={() => navigate('/marketplace')}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ background: '#f0f4f8', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <ShoppingBag size={36} color="var(--secondary-color)" />
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>I am a Buyer</h2>
            <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Discover unique, handmade treasures directly from rural creators. Support fair-trade craftsmanship.
            </p>
            <button className="btn-outline" style={{ width: '100%', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              Shop Collection <Store size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '8rem' }}>
        <p style={{ fontSize: '0.75rem', color: '#999', letterSpacing: '2px' }}>© 2026 ARTISAN PORTAL • KERALA HERITAGE PROJECT</p>
      </div>
    </div>
  );
};

export default LandingPage;
