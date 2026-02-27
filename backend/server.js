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
