import { type FullConfig } from "@playwright/test";
import { exec } from "child_process";

export default async function globalSetup(config: FullConfig) 

{
  console.log("[INFO]: starting global tear down process...");

  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log("[INFO]: local run detected - starting allure server...");

    exec("allure serve", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting allure server: ${error.message}`);
      }
    });

    console.log("[INFO]: completed global teardown process...");
  }
}
