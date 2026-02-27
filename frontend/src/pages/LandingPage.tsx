import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'var(--background-color)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <section style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.2 }}>Empowering Artisans</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: '#d7ccc8' }}>Zero-input listing for rural creators.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/portal" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--text-primary)', padding: '16px 32px' }}>
                Enter Portal
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Multi-Modal Listing</h3>
            <p style={{ color: 'var(--text-secondary)' }}>No typing required. Use voice narratives.</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Studio-in-a-Pocket</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Instantly polish photos.</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Dignity-First Pricing</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Calculate fair-trade prices.</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Share-to-Earn</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Generate an instant store link.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
