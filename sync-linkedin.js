const { chromium } = require('playwright');
const fs = require('fs');
// Robust import to handle different export styles
const pdf = require('pdf-parse'); 

async function scrapeDeepProfile() {
  const authFile = 'state.json';
  const urls = [
    'https://www.linkedin.com/in/adityaapatel/details/experience/',
    'https://www.linkedin.com/in/adityaapatel/details/projects/',
    'https://www.linkedin.com/in/adityaapatel/details/education/',
    'https://www.linkedin.com/in/adityaapatel/recent-activity/all/'
  ];

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: authFile });
  const page = await context.newPage();

  try {
    let combinedData = "=== SOURCE: LINKEDIN LIVE DATA ===\n";

    // 1. SCRAPE LINKEDIN SECTIONS
    for (const url of urls) {
      console.log(`📡 NAVIGATING TO: ${url}`);
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.scaffold-layout__main', { timeout: 10000 }).catch(() => null);
      
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await page.waitForTimeout(2000); 

      const sectionText = await page.innerText('body');
      combinedData += `\n--- SECTION: ${url} ---\n${sectionText}`;
    }

    console.log("🧠 CONSOLIDATING DATA...");
    if (!fs.existsSync('./content')) fs.mkdirSync('./content');
    fs.writeFileSync('./content/raw_scrape.txt', combinedData);
    console.log("✅ SUCCESS: LinkedIn + Resume data saved to raw_scrape.txt.");

  } catch (err) {
    console.error("❌ DEEP SYNC FAILED:", err.message);
  } finally {
    await browser.close();
  }
}

scrapeDeepProfile();