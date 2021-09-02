import nodeCron from "node-cron";
import { detect } from "./detector.js";
import ora from "ora";

async function runScripts() {
  await detect();
}

nodeCron.schedule("*/5 * * * *", runScripts); //run bot every 5 minutes to stay below cmc api rate limit

ora({
  text: "Detecting CMC listings...",
  color: "white",
  hideCursor: true,
}).start();
