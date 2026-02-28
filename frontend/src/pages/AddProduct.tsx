import React, { useState, useRef } from 'react';
import { Camera, Mic, Volume2, Save, Trash, CircleCheck, Share, DollarSign, Loader2, ArrowRight } from 'lucide-react';
import { calculatePrice } from '../utils/pricing';
import type { PricingParams } from '../utils/pricing';
import VisualProcessor from '../components/VisualProcessor';
import ProductShare from '../components/ProductShare';

const AddProduct: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [enhancedPhotos, setEnhancedPhotos] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [productData, setProductData] = useState<any>(null);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [audioExtracted, setAudioExtracted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [visualInsight, setVisualInsight] = useState<any>(null);
  
  const [name, setName] = useState('Handmade Artisan Work');
  const [artisan, setArtisan] = useState('Local Artisan');
  const [description, setDescription] = useState('Hand-crafted with traditional techniques.');
  const [pricing, setPricing] = useState<PricingParams>({
    materialCost: 0,
    laborHours: 0,
    livingWage: 200,
    tier: 'local',
  });

  const mediaRecorderRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos([reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleEnhanced = (enhancedImage: string, insight?: any) => {
    setEnhancedPhotos([enhancedImage]);
    if (insight) {
      setVisualInsight(insight);
      // If we already have a transcript, re-process it with the new visual data
      if (transcript && transcript !== 'Listening...' && !isRecording) {
        processTranscript(transcript, insight);
      }
    }
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
          alert("Speech recognition not supported. Please use Chrome.");
          return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'ml-IN';
        recognition.continuous = false; // Changed to false for better 'end' detection
        recognition.interimResults = false; // Only final result
        
        let finalTranscript = '';
        recognition.onstart = () => {
          setIsRecording(true);
          setAudioExtracted(false);
          setTranscript('Listening...');
        };

        recognition.onresult = (event: any) => {
          const result = event.results[0][0].transcript;
          finalTranscript = result;
          setTranscript(result);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech error", event.error);
          setIsRecording(false);
          if (event.error === 'no-speech') {
            setTranscript('No speech detected. Please try again.');
          }
        };

        recognition.onend = () => {
          setIsRecording(false);
          if (finalTranscript) {
            processTranscript(finalTranscript);
          } else if (isRecording) {
            setTranscript('Still listening...');
          }
        };

        recognition.start();
        mediaRecorderRef.current = recognition;

        // Auto-stop after 8 seconds to prevent hanging
        setTimeout(() => {
          if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
          }
        }, 8000);

      } catch (err) {
        console.error("Error accessing mic:", err);
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    }
  };

  const processTranscript = async (text: string, currentInsight?: any) => {
    setIsProcessingAudio(true);
    // CRITICAL: Always prefer the passed insight, otherwise use the state
    const insightToUse = currentInsight !== undefined ? currentInsight : visualInsight;
    
    console.log("Processing with insight:", insightToUse);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/translate-extract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, visualInsight: insightToUse })
      });
      const data = await response.json();
      
      if (data.success) {
        setPricing(prev => ({
          ...prev,
          materialCost: data.extractedData.materialCost,
          laborHours: data.extractedData.laborHours
        }));
        setDescription(data.translatedDescription);
        setName(data.extractedData.name);
      }
    } catch (err) {
      console.error("Transcription processing error:", err);
    } finally {
      setIsProcessingAudio(false);
      setAudioExtracted(true);
    }
  };

  const calculatedPrice = calculatePrice(pricing);

  const handleSaveProduct = async () => {
    const payload = {
      name,
      price: calculatedPrice,
      description: description,
      imageUrl: enhancedPhotos[0] || photos[0],
      artisanName: artisan,
      tier: pricing.tier
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        setProductData(data.product);
        setShowShare(true);
      }
    } catch (err) {
      console.error("Error saving:", err);
      // Fallback show share even if save fails for demo
      setProductData(payload);
      setShowShare(true);
    }
  };

  if (showShare && productData) {
    return (
      <ProductShare 
        product={{
          id: productData.id,
          name: productData.name,
          price: productData.price,
          image: productData.imageUrl,
          artisan: productData.artisanName,
          description: productData.description
        }}
        onBack={() => setShowShare(false)}
      />
    );
  }

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <input type="file" accept="image/*" capture="environment" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      
      <header style={{ textAlign: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '2.2rem', fontWeight: 900 }}>Artisan Portal</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 500 }}>Zero-Input Global Listing</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', maxWidth: '480px', margin: '0 auto' }}>
        
        {/* STEP 1: PHOTO */}
        <section 
          className="card" 
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            minHeight: '320px', cursor: 'pointer', padding: '0', overflow: 'hidden',
            border: photos.length > 0 ? '2px solid #e0e0e0' : '3px dashed var(--primary-color)',
            background: photos.length > 0 ? '#000' : '#fff', position: 'relative'
          }} 
          onClick={photos.length > 0 ? undefined : handleCapture}
        >
          {photos.length > 0 ? (
            <>
              <img src={enhancedPhotos[0] || photos[0]} alt="Product" style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '15px', left: '15px', display: 'flex', gap: '6px' }}>
                <span style={{ background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700 }}>{enhancedPhotos.length > 0 ? '✨ STUDIO MAGIC' : 'Captured'}</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setPhotos([]); setEnhancedPhotos([]); setAudioExtracted(false); }} style={{ position: 'absolute', top: '15px', right: '15px', background: 'white', border: 'none', padding: '8px', borderRadius: '50%', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}><Trash size={18} color="#ff1744" /></button>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#f0f4f8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Camera size={36} color="var(--primary-color)" />
              </div>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--primary-color)' }}>1. Photo</h2>
              <p style={{ fontSize: '0.85rem', color: '#888' }}>Tap to capture your work</p>
            </div>
          )}
        </section>

        {/* STEP 2: VOICE */}
        <section 
          className="card" 
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            minHeight: '220px', backgroundColor: isRecording ? '#fff5f5' : '#fff',
            border: audioExtracted ? '2px solid #e8f5e9' : '3px dashed var(--secondary-color)',
            opacity: photos.length > 0 ? 1 : 0.4,
            pointerEvents: photos.length > 0 ? 'auto' : 'none'
          }}
        >
          <button 
            onClick={toggleRecording}
            className={`icon-btn ${isRecording ? 'recording-pulse' : ''}`}
            style={{ 
              width: '75px', height: '75px', borderRadius: '50%',
              backgroundColor: isRecording ? '#ff1744' : 'var(--secondary-color)',
              color: 'white', marginBottom: '1rem'
            }}
          >
            {isRecording ? <Volume2 size={32} /> : <Mic size={32} />}
          </button>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--secondary-color)' }}>{audioExtracted ? 'Voice Processed' : '2. Tell the Story'}</h2>
          <p style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>{isRecording ? 'Listening...' : 'Say product type, cost & hours in Malayalam'}</p>
          
          {transcript && (
            <div style={{ marginTop: '1rem', padding: '8px 15px', background: '#f5f5f5', borderRadius: '10px', fontSize: '0.8rem', fontStyle: 'italic', color: '#444' }}>
              "{transcript}"
            </div>
          )}
        </section>

        {/* AUTO-TRIGGER STUDIO MAGIC COMPONENT */}
        {photos.length > 0 && enhancedPhotos.length === 0 && (
          <VisualProcessor image={photos[0]} onComplete={handleEnhanced} />
        )}

        {/* THE PRICE & SHARE SECTION (Reveals after voice) */}
        {(isProcessingAudio || audioExtracted) && (
          <section className="card animate-in" style={{ padding: '20px', border: '2px solid var(--primary-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            {isProcessingAudio ? (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <Loader2 className="animate-spin" size={32} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                <p style={{ fontWeight: 600 }}>Translating Malayalam Narration...</p>
                <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '5px' }}>Calculating fair-trade pricing & cataloging...</p>
              </div>
            ) : (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <input 
                    style={{ 
                      fontSize: '1.3rem', color: 'var(--primary-color)', marginBottom: '10px', width: '100%', 
                      textAlign: 'center', border: '1px solid #eee', padding: '5px', borderRadius: '5px' 
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <textarea 
                    style={{ 
                      fontSize: '0.9rem', color: '#555', fontStyle: 'italic', lineHeight: 1.4, width: '100%',
                      minHeight: '80px', border: '1px solid #eee', padding: '8px', borderRadius: '5px',
                      fontFamily: 'inherit', textAlign: 'center'
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '12px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.65rem', color: '#888', fontWeight: 800 }}>MATERIALS</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>₹{pricing.materialCost}</div>
                  </div>
                  <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '12px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.65rem', color: '#888', fontWeight: 800 }}>LABOR</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{pricing.laborHours}h</div>
                  </div>
                </div>

                <div style={{ padding: '15px', background: '#fff8e1', borderRadius: '15px', textAlign: 'center', marginBottom: '1.5rem', border: '1px solid #ffe082' }}>
                  <span style={{ fontSize: '0.75rem', color: '#f57f17', fontWeight: 800 }}>FAIR SELLING PRICE</span>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-color)' }}>₹{calculatedPrice}</div>
                </div>

                <button 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '18px', borderRadius: '35px', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                  onClick={handleSaveProduct}
                >
                  <Save size={20} /> Create Catalog & Share <ArrowRight size={20} />
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
