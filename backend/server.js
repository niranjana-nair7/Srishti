const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer for File Uploads (Images and Audio)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// --- Module 1: Zero-Input Listing (Audio Processing) ---
app.post('/api/translate-extract', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided.' });

  console.log(`[SEMANTIC-LOG] Malayalam Input: "${text}"`);

  // 1. FRACTIONAL & LARGE NUMBER SUPPORT
  const numMap = [
    { words: ['ആയിരം', '1000'], val: 1000 },
    { words: ['അഞ്ഞൂറ്', 'അഞ്ഞൂറു', '500'], val: 500 },
    { words: ['ഇരുന്നൂറ്', 'ഇരുന്നൂറു', '200'], val: 200 },
    { words: ['നൂറ്', 'നൂറു', 'നൂറിന്', '100'], val: 100 },
    { words: ['അമ്പത്', 'അമ്പതു', '50'], val: 50 },
    { words: ['പത്ത്', 'പത്തു', '10'], val: 10 },
    { words: ['എട്ട്', 'എട്ടു', '8'], val: 8 },
    { words: ['അഞ്ച്', 'അഞ്ചു', '5'], val: 5 },
    { words: ['നാല്', 'നാലു', '4'], val: 4 },
    { words: ['മൂന്ന്', 'മൂന്നു', '3'], val: 3 },
    { words: ['രണ്ടര', '2.5'], val: 2.5 },
    { words: ['രണ്ട്', 'രണ്ടു', '2'], val: 2 },
    { words: ['ഒന്നര', '1.5'], val: 1.5 },
    { words: ['ഒന്ന്', 'ഒന്നു', 'ഒരു', '1'], val: 1 },
    { words: ['പകുതി', '0.5'], val: 0.5 }
  ];

  // 2. SEMANTIC CATEGORY DETECTION
  const categories = [
    { key: 'Basket', words: ['കൊട്ട', 'വട്ടി', 'കുട്ട', 'basket'], material: 'natural bamboo' },
    { key: 'Mat', words: ['പായ', 'മെത്ത', 'തടുക്ക്', 'mat'], material: 'hand-spun screwpine' },
    { key: 'Pottery', words: ['ചട്ടി', 'കുടം', 'പാത്രം', 'മൺപാത്രം', 'pot'], material: 'fired terracotta' },
    { key: 'Woodwork', words: ['തടി', 'മരം', 'ശില്പം', 'കൊത്തുപണി', 'wood'], material: 'reclaimed teak' },
    { key: 'Textile', words: ['തുണി', 'സാരി', 'മുണ്ട', 'വസ്ത്രം', 'cloth'], material: 'organic cotton' },
    { key: 'Lamp', words: ['വിളക്ക്', 'ദീപം', 'lamp'], material: 'traditional brass' }
  ];

  let detectedCategory = categories.find(c => c.words.some(w => text.includes(w))) || { key: 'Handcrafted Item', material: 'local sustainable materials' };

  // 3. SURGICAL EXTRACTION
  let matches = [];
  numMap.forEach(item => {
    item.words.forEach(word => {
      let index = text.indexOf(word);
      while (index !== -1) {
        matches.push({ start: index, end: index + word.length, val: item.val });
        index = text.indexOf(word, index + 1);
      }
    });
  });

  const filteredMatches = matches.filter((m1, i) => !matches.some((m2, j) => i !== j && m2.start <= m1.start && m2.end >= m1.end && (m2.end - m2.start > m1.end - m1.start)));
  filteredMatches.sort((a, b) => a.start - b.start);

  const laborKeywords = ['മണിക്കൂർ', 'ദിവസം', 'നേരം', 'സമയം', 'എടുത്തു', 'പണി', 'ദിവസത്തെ', 'മണിക്കൂർകൊണ്ട്'];
  const costKeywords = ['രൂപ', 'റുപ്പിക', 'ചിലവ്', 'വില', 'വന്നു', 'വാങ്ങി', 'രൂപയുടെ'];

  let materialCost = 0;
  let laborHours = 0;

  filteredMatches.forEach(m => {
    const context = text.substring(Math.max(0, m.start - 30), Math.min(text.length, m.end + 30));
    if (laborKeywords.some(k => context.includes(k)) && laborHours === 0) laborHours = m.val;
    else if (costKeywords.some(k => context.includes(k)) && materialCost === 0) materialCost = m.val;
  });

  if (materialCost === 0) materialCost = filteredMatches[0]?.val || 150;
  if (laborHours === 0) laborHours = (filteredMatches.find(m => m.val !== materialCost)?.val) || 6;
  if (text.includes('ദിവസം') && laborHours < 7) laborHours *= 8;

  // 4. DYNAMIC NARRATIVE GENERATOR
  const name = `Artisan ${detectedCategory.key}`;
  const translatedDescription = `A premium ${detectedCategory.key.toLowerCase()} meticulously handcrafted using ${detectedCategory.material}. Each piece is a result of ${laborHours} hours of dedicated craftsmanship using traditional Kerala techniques.`;

  console.log(`[SEMANTIC-RESULT] Name: ${name}, Cost: ${materialCost}, Hours: ${laborHours}`);

  setTimeout(() => {
    res.json({
      success: true,
      translatedDescription,
      extractedData: { materialCost, laborHours, name }
    });
  }, 500);
});

app.post('/api/process-audio', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file uploaded.' });
  }
  
  // MOCK: Simulate AI processing of Malayalam voice note
  console.log(`Received audio file: ${req.file.filename}`);
  console.log('Simulating AI speech-to-text and keyword extraction (Malayalam -> English)');
  
  setTimeout(() => {
    res.json({
      success: true,
      message: 'Audio processed successfully',
      extractedData: {
        materialCost: 50,
        laborHours: 8,
        description: "Hand-woven with sustainable bamboo. Takes 1 day of dedicated craftsmanship."
      }
    });
  }, 2000); // 2 second mock delay
});

// --- Module 2: Studio-in-a-Pocket (Visual Magic) ---
app.post('/api/process-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded.' });
  }

  // MOCK: Simulate Background Removal & Generative Fill API
  console.log(`Received image file: ${req.file.filename}`);
  console.log('Simulating Studio Polish (Removing background, adding premium context)');

  setTimeout(() => {
    res.json({
      success: true,
      message: 'Image enhanced successfully',
      // In a real app, this would be a new URL pointing to the processed image from an AI service.
      // Here, we just return the original URL with a "polished" flag.
      enhancedImageUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`,
      status: 'polished'
    });
  }, 2500); // 2.5 second mock delay
});

// --- Module 4: Share-to-Earn (Product Store Creation) ---
const products = []; // In-memory database for now

app.post('/api/products', (req, res) => {
  const { name, price, description, imageUrl, artisanName, tier } = req.body;

  if (!name || !price || !imageUrl) {
    return res.status(400).json({ error: 'Missing required product fields.' });
  }

  const newProduct = {
    id: Math.random().toString(36).substring(2, 9),
    name,
    price,
    description,
    imageUrl,
    artisanName: artisanName || 'Local Artisan',
    tier: tier || 'local',
    createdAt: new Date()
  };

  products.push(newProduct);
  console.log(`Product created: ${newProduct.name} by ${newProduct.artisanName}`);

  res.status(201).json({
    success: true,
    message: 'Product listed successfully',
    product: newProduct,
    shareUrl: `https://artisan.shop/s/${newProduct.id}` // Mock share URL
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }
  res.json({ success: true, product });
});

// --- Health Check ---
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Artisan Platform Backend is running.' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
