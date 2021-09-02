import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
import { writeLog } from "./logger/writeLog.js";

var bot_message = "default message";

export async function sendMessage(message) {
  var bot_token = process.env.TG_BOT_TOKEN;
  var bot_chatID = process.env.TG_CHAT_ID;

  if (message != "") {
    bot_message = "You are now " + message + " holder. Congratulations.";
  }

  var send_text =
    "https://api.telegram.org/bot" +
    bot_token +
    "/sendMessage?chat_id=" +
    bot_chatID +
    "&text=" +
    bot_message;

  var result = await fetch(send_text);

  let resultJSON = await result.json();
  let ok = await resultJSON.ok;

  if (!ok) {
    let description = await resultJSON.description;

    await writeLog("TG error_message: " + description);
  }
}
