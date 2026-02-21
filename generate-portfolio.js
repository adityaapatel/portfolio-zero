const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  console.log("🧠 ARCHITECT_ZERO Agent Initiated...");

  try {
    // 1. Read Raw Notes
    let rawText = "";
    try {
      rawText = fs.readFileSync('./content/raw_notes.txt', 'utf8');
    } catch (e) {
      console.log("⚠️ No raw_notes.txt found. Creating one...");
      fs.writeFileSync('./content/raw_notes.txt', 'Initial project setup');
      return;
    }

    if (rawText.trim().length < 5) {
      console.log("⚠️ Notes too short or empty. Please add text to content/raw_notes.txt");
      return;
    }

    // 2. Generate Content
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Use the correct model name from your listModels output
    const prompt = `
      Convert these raw notes into a JSON portfolio entry.
      Raw Notes: "${rawText}"
      Output ONLY valid JSON (no markdown):
      {
        "title": "Short Tech Title",
        "techStack": "Tech Stack Used",
        "description": "2 sentences on architecture.",
        "impact": "1 specific metric."
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, '').trim();
    const newEntry = JSON.parse(text);

    // 3. Save to Database
    let data = [];
    try {
      if (fs.existsSync('./content/portfolio.json')) {
        data = JSON.parse(fs.readFileSync('./content/portfolio.json', 'utf8'));
      }
    } catch (e) {}
    
    data.unshift(newEntry);
    fs.writeFileSync('./content/portfolio.json', JSON.stringify(data, null, 2));
    
    // Clear the notes
    fs.writeFileSync('./content/raw_notes.txt', ''); 
    
    console.log("✅ SUCCESS: Portfolio updated.");
    console.log(newEntry);

  } catch (error) {
    console.error("❌ ERROR:", error);
  }
}

run();