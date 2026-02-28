import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, Award } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified login for demo
    if (username === 'artisan' && password === '1234') {
      localStorage.setItem('artisanAuth', 'true');
      onLogin();
      navigate('/portal');
    } else {
      setError('Invalid username or password (use artisan/1234)');
    }
  };

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--primary-color)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Award size={30} color="white" />
          </div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--secondary-color)' }}>Artisan Login</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>Secure portal for rural creators</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 800, color: '#555', marginBottom: '8px' }}>
              <User size={14} /> USERNAME
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              placeholder="artisan"
              required
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 800, color: '#555', marginBottom: '8px' }}>
              <Lock size={14} /> PASSWORD
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              placeholder="••••"
              required
            />
          </div>

          {error && <p style={{ color: 'red', fontSize: '0.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</p>}

          <button type="submit" className="btn-primary" style={{ width: '100%', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <LogIn size={18} /> Enter Portal
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: '#999' }}>
          New artisan? Contact your local collective for access.
        </p>
      </div>
    </div>
  );
};

export default Login;
