import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Award } from 'lucide-react';

const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        // Since backend doesn't have a GET /api/products yet, I should add it or handle the error
        if (response.ok) {
           const data = await response.json();
           if (data.success) {
             setProducts(data.products);
           }
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--secondary-color)', marginBottom: '1rem' }}>Artisan Marketplace</h1>
        <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Directly supporting local craftsmanship. Every purchase goes 100% to the artisan.
        </p>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}>Discovering Unique Pieces...</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '15px' }}>
          <ShoppingBag size={48} color="#ccc" style={{ marginBottom: '1.5rem' }} />
          <h3>No products listed yet.</h3>
          <p style={{ color: '#888', marginBottom: '2rem' }}>Be the first to list an artisan work!</p>
          <button onClick={() => navigate('/portal')} className="btn-primary">
            Start Listing
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {products.map((product) => (
            <div 
              key={product.id} 
              className="card" 
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s ease' }}
              onClick={() => navigate(`/product/${product.id}`)}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'relative', height: '250px' }}>
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                  <span style={{ background: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-color)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    ₹{product.price}
                  </span>
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 800, marginBottom: '8px' }}>
                  <Award size={14} /> {product.artisanName}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--secondary-color)' }}>{product.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '2.8rem' }}>
                  {product.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>100% HANDMADE</span>
                  <div style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '0.8rem' }}>
                    VIEW DETAILS <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
