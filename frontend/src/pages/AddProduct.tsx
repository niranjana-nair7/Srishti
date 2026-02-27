import React, { useState, useRef } from 'react';
import { Camera, Mic, Volume2, Save, Trash, CircleCheck, Share, DollarSign } from 'lucide-react';
import { calculatePrice } from '../utils/pricing';
import type { PricingParams } from '../utils/pricing';
import VisualProcessor from '../components/VisualProcessor';
import ProductShare from '../components/ProductShare';

const AddProduct: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [enhancedPhotos, setEnhancedPhotos] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [showShare, setShowShare] = useState(false);
  
  const [pricing, setPricing] = useState<PricingParams>({
    materialCost: 0,
    laborHours: 0,
    livingWage: 200, // Default for local
    tier: 'local',
  });

  const mediaRecorderRef = useRef<any>(null);

  // Simulate Photo Capture
  const handleCapture = () => {
    if (photos.length >= 3) return;
    const placeholder = `https://images.unsplash.com/photo-1590642916589-592bca10dfbf?auto=format&fit=crop&q=80&w=400&h=400`;
    setPhotos([...photos, placeholder]);
  };

  const handleEnhanced = (enhancedImage: string) => {
    setEnhancedPhotos([...enhancedPhotos, enhancedImage]);
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new (window as any).MediaRecorder(stream);
        const chunks: any[] = [];
        
        recorder.ondataavailable = (e: any) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          setAudioBlob(blob);
        };
        
        recorder.start();
        mediaRecorderRef.current = recorder;
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing mic:", err);
      }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  const calculatedPrice = calculatePrice(pricing);

  if (showShare) {
    return (
      <ProductShare 
        product={{
          name: "Hand-woven Basket",
          price: calculatedPrice,
          image: enhancedPhotos[0] || photos[0],
          artisan: "Meera Nair"
        }}
        onBack={() => setShowShare(false)}
      />
    );
  }

  return (
    <div className="container">
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary-color)' }}>New Product</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Zero-input listing for artisans</p>
      </header>

      {/* Module 1: Visual Capture */}
      <section className="card">
        <h2 className="section-title">Visual Capture</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', overflowX: 'auto' }}>
          {(enhancedPhotos.length > 0 ? enhancedPhotos : photos).map((src, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <img src={src} alt="Product" style={{ borderRadius: '12px', width: '100px', height: '100px', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--accent-color)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircleCheck size={14} color="white" />
              </div>
            </div>
          ))}
          {photos.length < 3 && (
            <button 
              onClick={handleCapture}
              style={{ width: '100px', height: '100px', border: '2px dashed #ccc', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', color: '#888' }}
            >
              <Camera size={24} />
              <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>Angle {photos.length + 1}</span>
            </button>
          )}
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {photos.length}/3 angles captured. Visual guides ensure perfect centering.
        </p>
      </section>

      {/* Module 2: Visual Processing (Studio Magic) */}
      {photos.length > 0 && enhancedPhotos.length === 0 && (
        <VisualProcessor image={photos[0]} onComplete={handleEnhanced} />
      )}

      {/* Module 1: Aural Capture */}
      <section className="card">
        <h2 className="section-title">Artisan's Narrative</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className={`btn-primary icon-btn ${isRecording ? 'recording-pulse' : ''}`}
            onClick={toggleRecording}
            style={{ 
              backgroundColor: isRecording ? '#ef5350' : 'var(--primary-color)',
              flex: 1,
              height: '60px',
              borderRadius: '30px'
            }}
          >
            {isRecording ? <Volume2 size={24} /> : <Mic size={24} />}
            {isRecording ? 'Listening...' : 'Press & Speak (Malayalam)'}
          </button>
        </div>
        {audioBlob && (
          <p style={{ marginTop: '0.5rem', color: '#2e7d32', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CircleCheck size={16} /> Narrative Recorded
          </p>
        )}
      </section>

      {/* Module 3: Dignity-First Pricing */}
      <section className="card">
        <h2 className="section-title">Fair-Trade Pricing</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Material Cost (₹)</label>
            <input 
              type="number" 
              value={pricing.materialCost} 
              onChange={(e) => setPricing({...pricing, materialCost: Number(e.target.value)})}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Labor Hours</label>
            <input 
              type="number" 
              value={pricing.laborHours} 
              onChange={(e) => setPricing({...pricing, laborHours: Number(e.target.value)})}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Selling Tier</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['local', 'retail', 'premium'] as const).map(t => (
              <button 
                key={t}
                onClick={() => setPricing({...pricing, tier: t})}
                style={{ 
                  flex: 1, 
                  padding: '8px', 
                  fontSize: '0.85rem',
                  backgroundColor: pricing.tier === t ? 'var(--primary-color)' : '#f5f5f5',
                  color: pricing.tier === t ? 'white' : 'var(--text-secondary)',
                  border: '1px solid #ddd'
                }}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#fff8e1', borderRadius: '12px', border: '1px solid #ffe082' }}>
          <span style={{ fontSize: '0.85rem', color: '#f57f17', fontWeight: 600 }}>RECOMMENDED PRICE</span>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>
            ₹{calculatedPrice}
          </div>
          <p style={{ fontSize: '0.75rem', color: '#f57f17' }}>Protects your labor and ensures a fair living wage.</p>
        </div>
      </section>

      {/* Module 4: Call to Action */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
        <button className="btn-secondary icon-btn" style={{ padding: '16px' }} onClick={() => {
          setPhotos([]);
          setEnhancedPhotos([]);
          setAudioBlob(null);
        }}>
          <Trash size={20} /> Reset
        </button>
        <button 
          className="btn-primary icon-btn" 
          style={{ padding: '16px' }} 
          disabled={photos.length === 0}
          onClick={() => setShowShare(true)}
        >
          <Save size={20} /> Save & Share <Share size={20} />
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
