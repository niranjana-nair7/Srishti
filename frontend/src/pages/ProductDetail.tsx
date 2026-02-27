import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, ShoppingBag, CheckCircle, Award, Leaf } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/products/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>Loading Artisan Work...</div>;

  if (!product) return (
    <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>
      <h2>Product not found</h2>
      <button onClick={() => navigate('/')} className="btn-primary" style={{ marginTop: '1rem' }}>Back to Home</button>
    </div>
  );

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--primary-color)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ArrowLeft size={20} /> Back
      </button>

      <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
        
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '5px' }}>{product.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Award size={18} color="var(--accent-color)" />
                <span style={{ fontWeight: 600 }}>By {product.artisanName}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary-color)' }}>₹{product.price}</div>
              <span style={{ fontSize: '0.75rem', background: '#e8f5e9', color: '#2e7d32', padding: '4px 10px', borderRadius: '20px', fontWeight: 700 }}>FAIR TRADE</span>
            </div>
          </div>

          <div style={{ margin: '2rem 0', padding: '1.5rem', background: '#f9f9f9', borderRadius: '15px', borderLeft: '5px solid var(--primary-color)' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', color: '#888' }}>The Artisan's Story</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#444', fontStyle: 'italic' }}>
              "{product.description || "Every stitch and curve in this piece represents generations of traditional Kerala craftsmanship, brought to life with sustainable materials."}"
            </p>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#666' }}>
              <CheckCircle size={16} color="#4caf50" /> 100% Handmade
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#666' }}>
              <Leaf size={16} color="#4caf50" /> Eco-Friendly
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem' }}>
            <button className="btn-primary" style={{ height: '60px', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <ShoppingBag size={24} /> Buy Directly from Artisan
            </button>
            <button style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
              <Share2 size={24} color="#666" />
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ color: '#999', fontSize: '0.9rem' }}>
          Buying this product ensures a <strong>Dignity-First</strong> wage for {product.artisanName}.
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
