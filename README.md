https://saferug.money COINMARKETCAP NEW BSC LISTINGS SNIPER BOT

THIS BOT IS NOT PROVEN TO BE PROFITABLE. 

# How to use:

<br>

### Preparation:

1. Install VSCode code editor on your computer. VSCode version doesn't matter, just not a super old one.

2. Open VSCode and then open the VSCode Terminal, by going to the topbar and selecting Teminal => New Terminal

3. Follow the steps in one of the links below, to make sure you have node.js and npm installed.
   <br>Mac Link: https://treehouse.github.io/installation-guides/mac/node-mac.html
   <br>Windows Link: https://phoenixnap.com/kb/install-node-js-npm-on-windows

4. Create a free account at https://moralis.io . Then go to "Speedy Nodes" => "BSC Endpoints" => "WS" and write down your Mainnet WS link (the first one).

5. Create a free account at https://pro.coinmarketcap.com/account and write down your CMC API key.

6. Create a MetaMask wallet in your browser, then write down your wallet address and seed phrase. Make sure you only have 1 address in this MetaMask wallet.

7. (Only if you want to get TG Notifications):
   <br>-Message @BotFather on Telegram, go through the steps and write down the bot token.
   <br>-Create a Telegram group and add @RawDataBot as a member. Send /start into the group chat. The bot will reply data. Copy the chat id (the string starting with -) and write it down.
   <br>-Add your bot, which you created in 7.1, to your TG Group, as a member and remove @RawDataBot.

<br>

### Setup and Run:

1. Unzip cmc-sniper-bot.zip

2. Drag & drop the cmc-sniper-bot folder into the middle of the VSCode startscreen. Make sure to drop it inside empty space, not in the terminal or some other place.

3. Go to VSCode terminal and type "npm i". Press enter. Wait until installation is finished. If it throws errors, make sure that your terminal has selected the cmc-sniper-bot folder* and that you have npm and node installed successfully.
   *you can navigate folders in terminal by using "cd .." to go out of the folder and "cd foldername" to go into folders. use "ls" to see all folders in your current location.

4. Go to .env file and add your:
   <br>-Wallet address(line 2)
   <br>-Seed phrase(line 3)
   <br>-Moralis Mainnet WS link(line 6)
   <br>-WBNB_AMOUNT (The amount of WBNB you want to spent per token buy. line 13)
   <br>-CMC API key(line 16)

5. (If you want to get TG Notifications go to .env)
   <br>-Set TGACTIVE to "true" if you want Telegram notifications. Otherwise it MUST be set to "false". (line 19)
   <br>-Bot token(line 20)
   <br>-Chat id(line 21)

6. Make sure you have WBNB in wallet to pay for tokens and BNB to pay for transaction fees.

7. Go to VSCode terminal and type "node start.js". Press enter.

8. The bot now buys new CMC BSC listings every 5 minutes. It will keep on running until you press ctrl+c or close VSCode. You cannot put your computer in sleepmode or shut it down, this will stop the bot.

<br>

### Start bot:

1. You can always start the bot by typing "node start.js" in the terminal and pressing enter. Always make sure the terminal has selected the cmc-sniper-bot folder, before executing this command.

<br>

### More info:

1. The bot detects the latest 10 listings on CMC. If you run it for the first time, it will buy all BSC tokens out of these 10. If you don't want to buy any tokens on first start, take all BSC tokens from the latest 10 CMC listings and paste their contract addresses into bought.txt.

2. The bought.txt is where the bot remembers the tokens it already bought. If you remove addresses it will buy the tokens again if they get found on CMC.

3. The log.txt shows you errors and what you bought at what time in a readable format.

4. If you want to send these code files to other people or upload it on the internet make sure to remove your seed phrase and all API keys from the .env file first. 

5. Make sure you have no empty spaces before and after the values in the .env file.

6. To detect more then every 5 minutes go to start.js and change the number 5 to something else (line 9). Keep in mind that the free Coinmarketcap API will run out of requests if you check more then every 5 minutes.

7. Rember that tokens buys can take up to a minute or more, if the network is congested.

8. Scripts get run everytime the clock reaches a full 5 minutes circle.(10:00, 10:05, 10:10, ...) 
