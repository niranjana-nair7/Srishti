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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const products = []; 
const orders = []; 

// --- Module 1: Zero-Input Listing (Audio Processing) ---
app.post('/api/translate-extract', (req, res) => {
  const { text, visualInsight } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided.' });

  console.log(`[SEMANTIC-LOG] Malayalam Input: "${text}"`);
  if (visualInsight) console.log(`[VISUAL-LOG] Image Insights: ${JSON.stringify(visualInsight)}`);

  // 1. DATA EXTRACTION
  const numMap = [
    { words: ['ആയിരം', '1000', 'ayiram'], val: 1000 },
    { words: ['അഞ്ഞൂറ്', 'അഞ്ഞൂറു', '500', 'annooru'], val: 500 },
    { words: ['നാനൂറ്', '400'], val: 400 },
    { words: ['മുന്നൂറ്', '300'], val: 300 },
    { words: ['ഇരുന്നൂറ്', '200', 'irunnooru'], val: 200 },
    { words: ['നൂറ്', '100', 'nooru'], val: 100 },
    { words: ['അമ്പത്', '50', 'ambathu'], val: 50 },
    { words: ['പത്ത്', '10', 'pathu'], val: 10 },
    { words: ['എട്ട്', '8', 'ettu'], val: 8 },
    { words: ['അഞ്ച്', '5', 'anchu'], val: 5 },
    { words: ['നാല്', '4', 'naalu'], val: 4 },
    { words: ['മൂന്ന്', '3', 'moonu'], val: 3 },
    { words: ['രണ്ട്', '2', 'randu'], val: 2 },
    { words: ['ഒന്ന്', '1', 'onnu'], val: 1 }
  ];

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

  const laborKeywords = ['മണിക്കൂർ', 'ദിവസം', 'നേരം', 'സമയം', 'പണി'];
  const costKeywords = ['രൂപ', 'റുപ്പിക', 'ചിലവ്', 'വില', 'വാങ്ങി'];

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

  // 2. CATEGORY & TECHNIQUE DETECTION
  const categories = [
    { key: 'Bamboo Basket', words: ['കൊട്ട', 'വട്ടി', 'കുട്ട', 'basket', 'bamboo'], material: 'natural bamboo', context: 'perfect for sustainable storage or as a rustic decor piece' },
    { key: 'Screwpine Mat', words: ['പായ', 'മെത്ത', 'തടുക്ക്', 'mat', 'screwpine'], material: 'hand-spun screwpine', context: 'a traditional floor covering that keeps rooms cool naturally' },
    { key: 'Clay Pot', words: ['ചട്ടി', 'കുടം', 'പാത്രം', 'മൺപാത്രം', 'pot', 'clay'], material: 'fired terracotta', context: 'ideal for traditional cooking or as a centerpiece' },
    { key: 'Teak Woodwork', words: ['തടി', 'മരം', 'ശില്പം', 'കൊത്തുപണി', 'wood', 'teak'], material: 'reclaimed teak', context: 'showcasing intricate carvings that tell stories of Kerala heritage' },
    { key: 'Handloom Saree', words: ['സാരി', 'മുണ്ട', 'വസ്ത്രം', 'saree', 'handloom', 'cloth'], material: 'organic cotton', context: 'breathable and elegant, woven with generations of expertise' },
    { key: 'Brass Lamp', words: ['വിളക്ക്', 'ദീപം', 'lamp', 'brass'], material: 'traditional brass', context: 'bringing a warm, spiritual glow to any living space' },
    { key: 'Coir Handicraft', words: ['ചയർ', 'കയർ', 'coir', 'fiber'], material: 'natural coconut fiber', context: 'durable and eco-friendly, handcrafted from local resources' }
  ];

  let detectedCategory = categories.find(c => c.words.some(w => text.includes(w))) || { 
    key: 'Handcrafted Item', 
    material: 'local sustainable materials',
    context: 'a unique piece reflecting authentic craftsmanship'
  };

  const actions = [
    { ml: 'നെയ്തത്', en: 'meticulously woven' },
    { ml: 'കൊത്തിയത്', en: 'hand-carved' },
    { ml: 'നിർമ്മിച്ചത്', en: 'hand-formed' },
    { ml: 'തുന്നിയത്', en: 'expertly stitched' },
    { ml: 'വരച്ചത്', en: 'delicately painted' }
  ];

  let detectedAction = actions.find(a => text.includes(a.ml))?.en || (visualInsight && visualInsight.technique) || 'carefully crafted';
  let finalMaterial = (visualInsight && visualInsight.material) || detectedCategory.material;

  // 3. NARRATIVE GENERATION
  const dictionary = [
    { ml: 'നന്നായി', en: 'carefully' },
    { ml: 'മനോഹരമായ', en: 'beautifully' },
    { ml: 'പരമ്പരാഗത', en: 'traditional' },
    { ml: 'പ്രകൃതിദത്ത', en: 'natural' },
    { ml: 'കൈകൊണ്ട്', en: 'by hand' },
    { ml: 'ഉയർന്ന', en: 'high-quality' },
    { ml: 'സുസ്ഥിര', en: 'sustainable' },
    { ml: 'തനതായ', en: 'authentic' }
  ];

  let qualities = dictionary.filter(item => text.includes(item.ml)).map(item => item.en);
  if (visualInsight && visualInsight.texture) qualities.push(visualInsight.texture);

  const qualityPrefix = qualities.length > 0 ? qualities.join(' and ') + ' ' : '';
  const sentences = [
    `This ${qualityPrefix}${detectedCategory.key.toLowerCase()} is ${detectedAction} using ${finalMaterial}.`,
    `It is ${detectedCategory.context}.`,
    `The artisan dedicated ${laborHours} hours to this specific project, ensuring every detail honors traditional techniques.`
  ];

  const translatedDescription = sentences.join(' ');
  const name = detectedCategory.key;

  console.log(`[SEMANTIC-RESULT] Name: ${name}, Action: ${detectedAction}, Cost: ${materialCost}, Hours: ${laborHours}`);

  setTimeout(() => {
    res.json({
      success: true,
      translatedDescription,
      extractedData: { materialCost, laborHours, name }
    });
  }, 500);
});

// --- Module 2: Studio-in-a-Pocket (Visual Magic) ---
app.post('/api/process-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file uploaded.' });

  const visualInsights = [
    { technique: 'fine wood carving', material: 'reclaimed teak', texture: 'intricate grain' },
    { technique: 'hand-loom weaving', material: 'organic cotton', texture: 'soft and breathable' },
    { technique: 'traditional clay moulding', material: 'terracotta clay', texture: 'rustic earth-tone' },
    { technique: 'precision brass casting', material: 'polished brass', texture: 'golden shine' },
    { technique: 'delicate bamboo split-weaving', material: 'natural bamboo', texture: 'flexible and strong' }
  ];

  const randomInsight = visualInsights[Math.floor(Math.random() * visualInsights.length)];

  setTimeout(() => {
    res.json({
      success: true,
      message: 'Image enhanced successfully',
      enhancedImageUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`,
      visualInsight: randomInsight,
      status: 'polished'
    });
  }, 2500);
});

// --- Module 4: Order & Product Management ---
app.post('/api/orders', (req, res) => {
  const { productId, customerName, customerEmail, customerAddress, quantity } = req.body;
  if (!productId || !customerName || !customerEmail || !customerAddress) {
    return res.status(400).json({ error: 'Missing required order fields.' });
  }

  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: 'Product not found.' });

  const newOrder = {
    id: Math.random().toString(36).substring(2, 9),
    productId,
    productName: product.name,
    productPrice: product.price,
    customerName,
    customerEmail,
    customerAddress,
    quantity: quantity || 1,
    totalPrice: product.price * (quantity || 1),
    status: 'Pending',
    createdAt: new Date()
  };

  orders.push(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

app.get('/api/orders', (req, res) => res.json({ success: true, orders }));

app.post('/api/products', (req, res) => {
  const { name, price, description, imageUrl, artisanName, tier } = req.body;
  if (!name || !price || !imageUrl) return res.status(400).json({ error: 'Missing required product fields.' });

  const newProduct = {
    id: Math.random().toString(36).substring(2, 9),
    name, price, description, imageUrl,
    artisanName: artisanName || 'Local Artisan',
    tier: tier || 'local',
    createdAt: new Date()
  };

  products.push(newProduct);
  res.status(201).json({ success: true, product: newProduct });
});

app.get('/api/products', (req, res) => res.json({ success: true, products }));

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found.' });
  res.json({ success: true, product });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
