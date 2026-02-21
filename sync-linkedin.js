const { chromium } = require('playwright');
const fs = require('fs');

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
    let combinedData = "";

    for (const url of urls) {
      console.log(`📡 NAVIGATING TO: ${url}`);
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      
      // Wait for LinkedIn's main content area to render
      await page.waitForSelector('.scaffold-layout__main', { timeout: 10000 }).catch(() => null);
      
      // Mimic human behavior: slow scroll to trigger lazy loading
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await page.waitForTimeout(2000); 

      // Extract raw text for AI processing
      const sectionText = await page.innerText('body');
      combinedData += `\n--- SECTION: ${url} ---\n${sectionText}`;
    }

    console.log("🧠 ANALYZING ALL SECTIONS...");
    // Pass 'combinedData' to your generate-portfolio.js logic here
    
    fs.writeFileSync('./content/raw_scrape.txt', combinedData);
    console.log("✅ SUCCESS: All 4 sections scraped and saved to raw_scrape.txt.");

  } catch (err) {
    console.error("❌ DEEP SYNC FAILED:", err.message);
  } finally {
    await browser.close();
  }
}

scrapeDeepProfile();