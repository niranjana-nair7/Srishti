# Project Architecture

```mermaid
graph TD
    subgraph Frontend
        A[React App] --> B[Visual Processor]
        A --> C[Product Listing]
        A --> D[Pricing Engine]
    end

    subgraph Backend
        E[Express Server] --> F[Multer Storage]
        E --> G[Semantic Translator]
        E --> H[Mock AI Engine]
    end

    A -- API Calls --> E
    F -- Static Files --> A
```

## Key Modules
1. **Zero-Input Listing**: Converts Malayalam audio/text to English descriptions.
2. **Studio-in-a-Pocket**: AI-enhanced image processing for artisans.
3. **Dignity-Pricing**: Transparent pricing based on labor hours and material costs.
4. **Artisan Marketplace**: Boutique-style e-commerce interface.
