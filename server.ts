import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', store: 'SoleCulture India' });
});

// AI SoleMate Stylist Endpoint
app.post('/api/stylist', async (req, res) => {
  try {
    const { outfit, occasion, colorTone, products } = req.body;

    const prompt = `User Outfit: "${outfit}"
Occasion: "${occasion}"
Color Theme: "${colorTone}"

Footwear Catalog:
${JSON.stringify(products, null, 2)}

Analyze the user's outfit and occasion for Indian fashion standards. Provide:
1. A concise styling summary (2 sentences).
2. 3 actionable styling tips (e.g., matching belt color, fabric texture advice, or accessories).
3. A color palette array (3 colors).
4. Suggested product IDs from the catalog that match best.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert Indian footwear stylist and fashion consultant for SoleCulture India. Respond in structured JSON format.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            stylingTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            colorPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            suggestedProductIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['summary', 'stylingTips', 'colorPalette', 'suggestedProductIds']
        }
      }
    });

    const jsonText = response.text || '{}';
    const parsedData = JSON.parse(jsonText);
    res.json(parsedData);
  } catch (error) {
    console.error('Stylist API Error:', error);
    res.status(500).json({ error: 'Failed to generate styling advice' });
  }
});

// AI Chatbot Assistant Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, products } = req.body;

    const prompt = `User Query: "${message}"

Available Footwear Catalog Summary:
${JSON.stringify(products)}

Provide a helpful, polite, and concise response (max 3 sentences) catering to Indian e-commerce customers (sizes UK 6-11, INR currency, PIN code delivery, COD, wedding/marathon recommendations).
If relevant, list matching product IDs in the suggestedProductIds array.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are SoleAI, a knowledgeable and friendly customer support assistant for SoleCulture India.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING },
            suggestedProductIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['reply']
        }
      }
    });

    const jsonText = response.text || '{}';
    const parsedData = JSON.parse(jsonText);
    res.json(parsedData);
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ reply: 'I am here to help you choose the best Indian footwear! Feel free to ask about sizes, delivery, or wedding shoes.' });
  }
});

// Vite or Static file serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
