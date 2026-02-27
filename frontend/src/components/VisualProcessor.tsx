import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, Home, CircleCheck } from 'lucide-react';

interface VisualProcessorProps {
  image: string;
  onComplete: (enhancedImage: string) => void;
}

const VisualProcessor: React.FC<VisualProcessorProps> = ({ image, onComplete }) => {
  const [stage, setStage] = useState<'original' | 'processing' | 'enhanced'>('original');

  const processImage = () => {
    setStage('processing');
    setTimeout(() => {
      setStage('enhanced');
      // In a real app, this would be the URL from the background removal/gen-fill API
      // Here we just use the same image or a slightly modified one
      onComplete(image); 
    }, 2500);
  };

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2 className="section-title">Studio Polish</h2>
      
      <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto', overflow: 'hidden', borderRadius: '16px', border: '1px solid #ddd' }}>
        <img 
          src={image} 
          alt="Original" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            filter: stage === 'processing' ? 'blur(4px) grayscale(0.5)' : 'none',
            transition: 'all 0.5s ease'
          }} 
        />
        
        {stage === 'processing' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Loader2 className="animate-spin" size={32} />
            <p style={{ fontSize: '0.75rem', marginTop: '8px' }}>Removing background...</p>
          </div>
        )}

        {stage === 'enhanced' && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#4caf50', borderRadius: '50%', padding: '4px' }}>
            <CircleCheck size={16} color="white" />
          </div>
        )}
      </div>

      <div style={{ marginTop: '1rem' }}>
        {stage === 'original' && (
          <button onClick={processImage} className="btn-primary icon-btn" style={{ width: '100%', justifyContent: 'center' }}>
            <Sparkles size={18} /> Apply Studio Magic
          </button>
        )}
        
        {stage === 'enhanced' && (
          <div style={{ padding: '8px', background: '#e8f5e9', borderRadius: '8px', color: '#2e7d32', fontSize: '0.85rem' }}>
            <p>Background removed & contextual placement applied!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualProcessor;
