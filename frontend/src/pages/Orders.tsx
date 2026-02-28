import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, User, Mail, MapPin, Tag } from 'lucide-react';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--secondary-color)', marginBottom: '1rem' }}>Artisan Orders</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Tracking the impact of direct support.</p>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Orders...</div>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '15px' }}>
          <ShoppingBag size={48} color="#ccc" style={{ marginBottom: '1.5rem' }} />
          <h3>No orders yet.</h3>
          <p style={{ color: '#888' }}>When customers buy from the marketplace, they'll appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order) => (
            <div key={order.id} className="card" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
              <div>
                <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '10px', textAlign: 'center' }}>
                  <Tag size={24} color="var(--primary-color)" style={{ marginBottom: '10px' }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888' }}>ORDER ID</div>
                  <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>#{order.id.toUpperCase()}</div>
                </div>
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-color)' }}>₹{order.totalPrice}</div>
                  <span style={{ fontSize: '0.7rem', background: '#e8f5e9', color: '#2e7d32', padding: '4px 10px', borderRadius: '20px', fontWeight: 700 }}>PAID DIRECTLY</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '0.9rem', color: 'var(--secondary-color)', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>PRODUCT</h3>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '5px' }}>{order.productName}</div>
                  <div style={{ fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '0.9rem', color: 'var(--secondary-color)', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>CUSTOMER</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', fontWeight: 600 }}>
                    <User size={16} color="#888" /> {order.customerName}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', fontSize: '0.85rem' }}>
                    <Mail size={16} color="#888" /> {order.customerEmail}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem' }}>
                    <MapPin size={16} color="#888" style={{ marginTop: '4px' }} /> {order.customerAddress}
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

export default Orders;
