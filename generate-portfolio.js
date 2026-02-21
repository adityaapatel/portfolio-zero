const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function generateRecruiterPortfolio() {
  console.log("🧠 ARCHITECT_ZERO: Commencing High-Engineering Data Sync...");

  try {
    const rawData = fs.readFileSync('./content/raw_scrape.txt', 'utf8');
    // Using 2.0-flash for high-speed deterministic JSON generation
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
    const resumePart = fileToGenerativePart("./Patel Aditya, Resume.pdf", "application/pdf");

    const prompt = `
      CONTEXT: You are a Senior Data Engineer. 
      TASK: Extract and normalize portfolio data for Aditya Patel (3.91 GPA, Incoming SWE Intern @ Fidelity).

      MAPPING CONSTRAINTS (MANDATORY):

      MAPPING CONSTRAINTS (MANDATORY):
  1. SKILLS NORMALIZATION: Use EXACT SimpleIcons slugs only. 
     - Verification: Java MUST be 'openjdk', C# MUST be 'csharp', C++ MUST be 'cplusplus'.
  2. DOMAIN ATTRIBUTION: Assign the shortest valid web domain for logos. 
     - Verification: Fidelity -> 'fidelity.com', WPI -> 'wpi.edu'. Do NOT include 'https://' or subfolders.
  3. EXPERIENCE ACCURACY: Extract the EXACT 'company', 'role', and 'duration' from the PDF for the top 3 high-impact roles.
      1. SKILLS NORMALIZATION: Map tech names to EXACT SimpleIcons slugs.
      GO Beyond basic name matching. Use the official SimpleIcons database to find the correct slug for each skill, note they maybe not named exactly what they are commonly called. For example:
         - TABLE: Java -> 'openjdk', C# -> 'csharp', C++ -> 'cplusplus', Python -> 'python', Flask -> 'flask', 
           SQL -> 'postgresql', AWS -> 'amazonaws', Azure -> 'microsoftazure', Git -> 'git', Docker -> 'docker', 
           Linux -> 'linux', HTML5 -> 'html5', CSS3 -> 'css3', JavaScript -> 'javascript', TypeScript -> 'typescript'.
         - SORTING: Sort skills by [Languages] -> [Frameworks] -> [Infrastructure] -> [Soft Skills].
      2. DOMAIN ATTRIBUTION: Assign verified web domains for company logos based on the most recent experience section. Use the official company website domain, not the parent company if it's a subsidiary. For example:
         - TABLE: Fidelity Investments -> 'fidelity.com', WPI -> 'wpi.edu', Shein -> 'shein.com'.
      3. PROJECTS: Distill top 4-6 projects into 'title', 'tech' (slash-separated), and 'bulletPoints' (max 3 concise points). Include 'repoUrl' and 'liveUrl' if available.
      4. EXPERIENCE: For each role, extract 'company', 'role', 'domain' (from #2), 'description' (1-2 sentences), and 'duration' (e.g., 'June 2025 - August 2025').

      OUTPUT FORMAT: Provide ONLY the JSON object as specified below. Do NOT include any explanatory text or formatting.

      OUTPUT: VALID RAW JSON ONLY.
      {
        "status": "Incoming Software Engineering Intern @ Fidelity Investments (Summer 2026)",
        "skills": [{ "name": "string", "slug": "string" }],
        "experience": [{ "company": "string", "role": "string", "domain": "string", "description": "string", "duration": "string" }],
        "curatedProjects": [{ "title": "string", "tech": "string", "bulletPoints": ["string"], "repoUrl": "url", "liveUrl": "url" }]
      }
    `;

    const result = await model.generateContent([prompt, rawData, resumePart]);
    let cleanedJson = result.response.text().replace(/```json|```/g, '').trim();
    const finalData = JSON.parse(cleanedJson);

    // Write to production JSON files
    fs.writeFileSync('./content/portfolio.json', JSON.stringify(finalData.curatedProjects || [], null, 2));
    
    fs.writeFileSync('./content/linkedin_sync.json', JSON.stringify({
      status: finalData.status,
      skills: finalData.skills || [],
      experience: finalData.experience || [],
      lastUpdate: new Date().toISOString()
    }, null, 2));

    console.log("✅ HIGH-IMPACT SYNC COMPLETE: Slugs and Domains normalized.");
  } catch (err) {
    console.error("❌ ARCHITECT ERROR:", err.message);
  }
}

generateRecruiterPortfolio();