import { chromium } from "playwright";

const SCRATCH = "C:\\Users\\HOME\\AppData\\Local\\Temp\\claude\\c--Users-HOME-Growly-2-0\\890592cd-7501-4a81-b035-25cc6cbeb4dd\\scratchpad\\";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 2 });
await page.goto("file://" + SCRATCH.replace(/\\/g, "/") + "meta-ad.html", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.screenshot({ path: SCRATCH + "meta-ad-output.png" });
await browser.close();
console.log("done");
