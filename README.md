# Artisan Portal - AI-Powered Artisan Marketplace

ArtisanDignity is a "Boutique-as-a-Service" platform designed specifically for rural artisans in Kerala. It solves the digital barrier by allowing artisans to list products using Malayalam audio and provides a "Studio-in-a-Pocket" to enhance product photography with AI-driven insights. 

The core philosophy is **Dignity-First Pricing**, ensuring every artisan is paid a fair living wage for their labor, with transparent pricing models for local, retail, and premium markets.

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Vite, React Router 7, Lucide Icons, Vanilla CSS (Custom Boutique Theme).
- **Backend:** Node.js, Express, Multer (File Processing), Dotenv.
- **Languages:** JavaScript (ESM/CommonJS), TypeScript, Malayalam (Semantic Processing).
- **Architecture:** Client-Server architecture with a focus on semantic translation and visual enhancement.

## 🚀 Features

1. **Zero-Input Listing (Semantic Audio Processing):** Artisans record their product details in Malayalam. The platform translates this to high-quality English descriptions and extracts critical data like material costs and labor hours.
2. **Studio-in-a-Pocket (Visual Intelligence):** Upload raw product photos to receive AI-enhanced "polished" versions, along with automated detection of craft techniques (e.g., teak carving, handloom weaving) and material textures.
3. **Dignity-First Pricing Engine:** A transparent calculator that determines product price based on:
   - **Base Price:** `Material Cost + (Labor Hours * Local Living Wage)`
   - **Market Multipliers:** Local (1.1x), Retail (1.5x), and Premium (2.5x).
4. **Artisan Portal & Marketplace:** A minimalist, boutique-style e-commerce interface showcasing products with their "Dignity Story"—the hours of labor and traditional techniques behind each piece.
5. **Secure Order Management:** A streamlined system for tracking pending and completed orders with customer details.

## 📸 Screenshots

<img width="1919" height="913" alt="image" src="https://github.com/user-attachments/assets/44572cba-8753-4f78-96d6-bb810add5191" />

*The Boutique Marketplace showcasing handcrafted items with high-resolution imagery.*

<img width="1918" height="907" alt="image" src="https://github.com/user-attachments/assets/bf6e6ed7-ec6d-48b4-a265-a660a0855f24" />
*The Artisan Portal where Malayalam audio is translated into professional English listings.*

<img width="1918" height="904" alt="image" src="https://github.com/user-attachments/assets/56fb916d-92fd-41a4-95d1-b1e77d56aea8" />
*Transparent breakdown of material costs, labor hours, and living wage calculations.*

## 🎥 Demo Video

[Watch the Demo on YouTube](https://youtu.be/placeholder)

## 🏗 Architecture

The system uses a modular approach to separate visual processing from semantic translation.

- **Frontend (`/frontend`):** Handles the UI, state management, and interaction with the pricing utility.
- **Backend (`/backend`):** Manages file uploads (Multer) and simulates AI processing for translation and visual insights.
- **Storage (`/backend/uploads`):** Persistent storage for artisan-uploaded assets.

*Full diagram available in [docs/architecture.md](./docs/architecture.md).*

## 📖 API Documentation

### Products
- `GET /api/products`: Retrieve all listed products.
- `GET /api/products/:id`: Get detailed info for a specific product.
- `POST /api/products`: Add a new product to the marketplace.

### AI Processing
- `POST /api/translate-extract`: Translates Malayalam text/audio input and extracts semantic data.
- `POST /api/process-image`: Enhances uploaded images and provides material/technique insights.

### Orders
- `GET /api/orders`: View all marketplace orders.
- `POST /api/orders`: Place a new order.

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm

### 1. Clone & Install Dependencies
```bash
# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 2. Configure Environment
Create a `.env` file in the `backend` directory:
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. Run the Application
```bash
# Start Backend (from /backend)
npm run dev

# Start Frontend (from /frontend)
npm run dev
```

## 👥 Team
- **Development Lead:** [Your Name/Team Name]
- **Design & UI:** [Designer Name]

## 📜 License
This project is licensed under the [MIT License](./LICENSE).

## 🤖 AI Tools Usage
- **Gemini CLI:** Used for project structuring, README generation, and architectural drafting.
- **Mock Semantic AI:** Custom logic for Malayalam keyword extraction and translation.
