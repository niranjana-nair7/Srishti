import React from 'react';
import { Share2, MessageCircle, Copy, Globe, ArrowLeft } from 'lucide-react';

interface ProductShareProps {
  product: {
    name: string;
    price: number;
    image: string;
    artisan: string;
  };
  onBack: () => void;
}

const ProductShare: React.FC<ProductShareProps> = ({ product, onBack }) => {
  const shareUrl = `https://artisan.shop/s/${Math.random().toString(36).substring(7)}`;

  const shareToWhatsApp = () => {
    const text = `Hi! I just finished this hand-woven ${product.name}. You can see the details and price here: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="container">
      <button onClick={onBack} className="icon-btn" style={{ background: 'none', color: 'var(--primary-color)', marginBottom: '1rem', padding: 0 }}>
        <ArrowLeft size={20} /> Edit Details
      </button>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{product.name}</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>By {product.artisan}</p>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>
              ₹{product.price}
            </div>
          </div>
          
          <div style={{ margin: '1.5rem 0', padding: '1rem', background: '#f5f5f5', borderRadius: '12px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              "Hand-woven with sustainable bamboo. Takes 3 days of dedicated craftsmanship."
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ padding: '4px 12px', background: '#e1f5fe', color: '#0288d1', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>Handmade</span>
            <span style={{ padding: '4px 12px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>Eco-friendly</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>Share to Earn</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button 
            onClick={shareToWhatsApp}
            className="btn-primary icon-btn" 
            style={{ backgroundColor: '#25D366', color: 'white', padding: '14px' }}
          >
            <MessageCircle size={20} /> WhatsApp
          </button>
          <button 
            className="btn-primary icon-btn" 
            style={{ backgroundColor: 'var(--primary-color)', padding: '14px' }}
          >
            <Share2 size={20} /> More
          </button>
        </div>
        
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: '#fff8e1', borderRadius: '8px', border: '1px solid #ffe082' }}>
          <Globe size={16} color="#f57f17" />
          <code style={{ flex: 1, fontSize: '0.8rem', color: '#f57f17' }}>{shareUrl}</code>
          <button style={{ background: 'none', color: '#f57f17' }}><Copy size={16} /></button>
        </div>
      </div>
    </div>
  );
};

export default ProductShare;
