const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function syncLinkedIn() {
  console.log("📡 INITIATING LINKEDIN SHADOW SYNC...");
  
  try {
    // We scrape the public Google Search result for your profile to bypass the login wall
    const searchUrl = `https://www.google.com/search?q=site:linkedin.com/in/adityaapatel`;
    const response = await axios.get(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    
    const $ = cheerio.load(response.data);
    const metaDescription = $('meta[name="description"]').attr('content') || "Aditya Ajit Patel - Senior Platform Architect & WPI Alum";
    
    console.log("🧠 ANALYZING ARCHITECTURAL DATA...");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      CONTEXT: You are the AI Agent for Aditya Ajit Patel (21, WPI CS Alum, Senior Platform Architect).
      INPUT DATA: "${metaDescription}"
      
      TASK:
      1. Create a "Live System Status" (max 10 words) showing current architectural focus.
      2. Generate a "Bio Update" based on his background in Crypto, Real Estate, and CS.
      
      OUTPUT ONLY JSON:
      {
        "status": "string",
        "bioSnippet": "string"
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, '').trim();
    const data = JSON.parse(text);

    // Save to content folder
    fs.writeFileSync('./content/linkedin_sync.json', JSON.stringify({ 
      ...data, 
      lastUpdate: new Date().toISOString() 
    }, null, 2));
    
    console.log("✅ SYNC SUCCESSFUL: " + data.status);
  } catch (error) {
    console.error("❌ SYNC FAILED:", error.message);
  }
}

syncLinkedIn();