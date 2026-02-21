import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import portfolioData from '../../../../content/portfolio.json';
// Assuming scrape.txt is in your content folder
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Read the raw scrape data for deeper context
    const scrapePath = path.join(process.cwd(), 'content', 'scrape.txt');
    const rawScrape = fs.readFileSync(scrapePath, 'utf8');

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash", // Upgraded to 2.0 for superior reasoning
      systemInstruction: `
        You are "Aditya AI," a high-performance assistant for Aditya Patel's portfolio. 
        Your knowledge is strictly based on the following raw data:

        USER PORTFOLIO DATA (JSON):
        ${JSON.stringify(portfolioData)}

        RAW SCRAPE DATA:
        ${rawScrape}

        CORE IDENTITY:
        - Aditya Patel, 21, WPI CS Alum (3.94 GPA).
        - Incoming Software Engineering Intern @ Fidelity (Summer 2026).
        - Presidential leader at SASA.
        
        INSTRUCTIONS:
        - Use the provided JSON and Scrape data to answer technical questions about projects.
        - If someone asks about "Lasker Morris AI" or "CPU Scheduler," refer to the scrape/JSON details.
        - Be professional, slightly witty, and tech-savvy.
      `,
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    return NextResponse.json({ reply: response.text() });
  } catch (error) {
    console.error("Gemini 2.0 Error:", error);
    return NextResponse.json({ reply: "System momentarily desynced. Re-initializing..." }, { status: 500 });
  }
}