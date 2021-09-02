import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";
import { promises as fs } from "fs";
import { buy } from "./buyer.js";
import { writeBoughtFile } from "./logger/addToken.js";
import { writeLog } from "./logger/writeLog.js";
import { sendMessage } from "./telegram.js";

export async function detect() {
  var url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

  var apiKey = process.env.CMC_API_KEY;

  var urlKey = "?CMC_PRO_API_KEY=" + apiKey;

  var urlParams =
    "&sort=date_added&start=1&limit=10&cryptocurrency_type=tokens";

  let newTokens = await fetch(url + urlKey + urlParams, {
    mode: "no-cors",
  });

  let newTokensJSON = await newTokens.json();

  let error_code = await newTokensJSON.status.error_code;
  let error_message = await newTokensJSON.status.error_message;

  if (error_code != 0) {
    await writeLog("CMC error_message: " + error_message);
    return;
  }

  let newTokensArray = await newTokensJSON.data;
  var interestingTokensArray = [];
  var interestingTokensNamesArray = [];
  var tokensFound = 0;

  for (let i = 0; i < newTokensArray.length; i++) {
    let tokenPlatform = await newTokensArray[i].platform;
    let tokenName = newTokensArray[i].name;
    if (tokenPlatform != null) {
      let tokenPlatformName = await tokenPlatform.name;

      if (tokenPlatformName === "Binance Smart Chain") {
        let tokenPlatformAddress = await tokenPlatform.token_address;
        tokensFound = interestingTokensArray.push(tokenPlatformAddress);
        interestingTokensNamesArray.push(tokenName);
      }
    }
  }

  var file = await openBoughtFile();

  var wbnb_address = process.env.WBNB;

  for (let x = 0; x < tokensFound; x++) {
    if (file.includes(interestingTokensArray[x]) === false) {
      await writeLog(
        "detection success for: " +
          interestingTokensNamesArray[x] +
          ". Address: " +
          interestingTokensArray[x]
      );

      console.log(
        interestingTokensNamesArray[x] +
          " token detected. Address: " +
          interestingTokensArray[x]
      );

      var buyResult = await buy(wbnb_address, interestingTokensArray[x]);

      if (!buyResult) {
        await writeLog(
          "buy failed for: " +
            interestingTokensNamesArray[x] +
            " Address: " +
            interestingTokensArray[x]
        );

        console.log(
          "buy failed for: " +
            interestingTokensNamesArray[x] +
            " Address: " +
            interestingTokensArray[x]
        );
        continue;
      }

      if (buyResult != "buyer script success") {
        await writeLog(
          "buy failed for: " +
            interestingTokensNamesArray[x] +
            " Address: " +
            interestingTokensArray[x]
        );

        console.log(
          "buy failed for: " +
            interestingTokensNamesArray[x] +
            " Address: " +
            interestingTokensArray[x]
        );

        continue;
      }

      if (buyResult === "buyer script success") {
        await writeLog(
          "buy success for: " +
            interestingTokensNamesArray[x] +
            ". Address: " +
            interestingTokensArray[x]
        );

        console.log(
          interestingTokensNamesArray[x] +
            " token bought. Address: " +
            interestingTokensArray[x]
        );

        await writeBoughtFile(interestingTokensArray[x]);

        var tgEnabled = process.env.TGACTIVE;
        if (tgEnabled === "true")
          await sendMessage(interestingTokensNamesArray[x]);

        continue;
      }
    }
  }
}

async function openBoughtFile() {
  var result = await fs.readFile("logger/bought.txt");
  if (!result) {
    await writeLog("Couldn't read bought.txt file.");
    return;
  } else {
    return result;
  }
}
