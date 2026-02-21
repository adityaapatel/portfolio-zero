const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateRecruiterPortfolio() {
  console.log("🧠 ARCHITECT_ZERO: Distilling Scrape for High-Impact Recruiter View...");

  try {
    const rawData = fs.readFileSync('./content/raw_scrape.txt', 'utf8');
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
      You are an Expert Technical Recruiter. Based on this LinkedIn scrape, curate a world-class professional portfolio for Aditya Patel.
      
      DATA: ${rawData.substring(0, 20000)}

      CURATION LOGIC:
      1. STATUS: Identify the most prestigious current/upcoming role (e.g., Incoming SWE Intern @ Fidelity).
      2. PROJECTS: Select ONLY projects that demonstrate high technical depth (e.g., CNNs, Java Game AI, Cloud/DevOps). 
         - For each, write a "Recruiter-Ready" description: Action Verb + Task + Quantifiable Result.
      3. EDUCATION: Feature the 3.91 GPA, WPI background, and "Charles O. Thompson Scholar" honor prominently.
      4. LEADERSHIP: Capture the SASA Presidency, focusing on the scale of impact (300+ members).
      5. SKILLS: Aggregate a "Core Tech Stack" from across all sections.

      OUTPUT FORMAT: RAW JSON ONLY.
      {
        "status": "string",
        "bio": "string",
        "curatedProjects": [
          { "title": "string", "tech": "string", "bulletPoints": [] }
        ],
        "topSkills": [],
        "honors": []
      }
    `;

    const result = await model.generateContent(prompt);
    let cleanedJson = result.response.text().replace(/```json|```/g, '').trim();
    const finalData = JSON.parse(cleanedJson);

    // Write to the files that power your Next.js frontend
    fs.writeFileSync('./content/portfolio.json', JSON.stringify(finalData.curatedProjects, null, 2));
    
    fs.writeFileSync('./content/linkedin_sync.json', JSON.stringify({
      status: finalData.status,
      bioSnippet: finalData.bio,
      skills: finalData.topSkills,
      honors: finalData.honors,
      lastUpdate: new Date().toISOString()
    }, null, 2));

    console.log("✅ RECRUITER SYNC COMPLETE: Only the highest value data has been preserved.");

  } catch (err) {
    console.error("❌ ARCHITECT ERROR:", err.message);
  }
}

generateRecruiterPortfolio();