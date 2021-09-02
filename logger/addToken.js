import { promises as fs } from "fs";

export async function writeBoughtFile(interestingToken) {
  await fs.appendFile("logger/bought.txt", interestingToken + "\r\n");
}
