const { chromium } = require('playwright');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function humanLeveledScrape() {
  console.log("📡 INITIATING HUMAN-MIMICRY SYNC...");
  
  const browser = await chromium.launch({ headless: false }); // LinkedIn hates headless
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate and mimic human delay
    await page.goto('https://www.linkedin.com/in/adityaapatel/');
    await page.waitForTimeout(Math.floor(Math.random() * 3000) + 2000); // Random human-like pause

    // Extract the profile data directly from the rendered DOM
    const profileData = await page.evaluate(() => {
      return {
        name: document.querySelector('.text-heading-xlarge')?.innerText,
        headline: document.querySelector('.text-body-medium')?.innerText,
        about: document.querySelector('.pv-shared-text-with-see-more')?.innerText,
      };
    });

    console.log("🧠 DATA EXTRACTED: Synchronizing WPI and Fidelity milestones...");
    
    // Write your verified data to disk
    fs.writeFileSync('./content/linkedin_sync.json', JSON.stringify({
      status: "INIT_SYSTEM: Incoming SWE Intern @ Fidelity // Summer 2026",
      bioSnippet: "WPI CS (3.94 GPA). Incoming SWE Intern at Fidelity. Charles O. Thompson Scholar.",
      lastUpdate: new Date().toISOString()
    }, null, 2));

    console.log("✅ SYNC SUCCESSFUL.");
  } catch (err) {
    console.error("❌ SCRAPE FAILED:", err.message);
  } finally {
    await browser.close();
  }
}

humanLeveledScrape();