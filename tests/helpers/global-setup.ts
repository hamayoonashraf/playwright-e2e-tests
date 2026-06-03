import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) 

{
  console.log("[INFO]: starting global setup...");

  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log(`[INOF]: detecting local runner`);

    // delete allure results
    const resultsDir = path.resolve(process.cwd(), "allure-results");
    console.log(`>> resultsDir: ${resultsDir}`);

    if (fs.existsSync(resultsDir)) {
      fs.rmSync(resultsDir, { recursive: true, force: true });
      console.log(">> Allure results directory deleted successfully.");
    }
  }

  console.log("[INFO]: completed global setup...");


  // set the login cookie global variable

  process.env.LOGIN_COOKIES = undefined;
  


}
