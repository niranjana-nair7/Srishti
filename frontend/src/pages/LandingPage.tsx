import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 20px' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--primary-color)', marginBottom: '1.5rem', display: 'block' }}>Dignity-First Marketplace</span>
        
        <h1 style={{ fontSize: 'calc(4rem + 2vw)', color: 'var(--secondary-color)', lineHeight: 0.9, marginBottom: '2rem' }}>
          Artisan <span style={{ fontStyle: 'italic', fontWeight: 'lighter' }}>by nature.</span><br />
          Crafted by <span style={{ color: 'var(--primary-color)' }}>soul.</span>
        </h1>
        
        <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '4rem', fontWeight: 300, lineHeight: 1.8 }}>
          A global stage for local mastery. We use zero-input AI to transcribe your narrative in Malayalam, calculate fair-trade dignity wages, and create world-class digital catalogs in seconds.
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/portal')} className="btn-primary" style={{ padding: '25px 50px', fontSize: '0.85rem' }}>
            Enter Artisan Portal <ArrowRight size={18} style={{ marginLeft: '10px' }} />
          </button>
          <button className="btn-outline" style={{ padding: '25px 50px', fontSize: '0.85rem' }}>
            Explore Collections
          </button>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '12rem' }}>
        <p style={{ fontSize: '0.75rem', color: '#999', letterSpacing: '2px' }}>© 2026 ARTISAN PORTAL • KERALA HERITAGE PROJECT</p>
      </div>
    </div>
  );
};

export default LandingPage;
