const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

// Access your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listAvailableModels() {
  console.log("📡 Connecting to Google AI...");
  
  try {
    // This is the direct call the error message asked for
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Placeholder to get client
    
    // We use the raw API manager to list models
    // (Note: The SDK doesn't have a direct 'listModels' helper in all versions, 
    // so we use a raw fetch to be 100% sure what the API sees).
    
    const key = process.env.GEMINI_API_KEY;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();

    if (data.error) {
      console.error("❌ API ERROR:", data.error.message);
      return;
    }

    console.log("\n✅ AVAILABLE MODELS (Copy one of these):");
    console.log("----------------------------------------");
    
    const models = data.models || [];
    const generateModels = models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
    
    generateModels.forEach(m => {
      // We only want the name part, e.g., 'gemini-1.5-flash'
      console.log(`"${m.name.replace('models/', '')}"`);
    });
    
    console.log("----------------------------------------");

  } catch (error) {
    console.error("❌ NETWORK ERROR:", error);
  }
}

listAvailableModels();