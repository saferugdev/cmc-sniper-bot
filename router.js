import dotenv from "dotenv";
dotenv.config();

import _ethers from "ethers";
const ethers = _ethers;

export async function configRouter() {
  var ROUTER = process.env.BSC_ROUTER;

  const provider = new ethers.providers.WebSocketProvider(
    process.env.BSC_WSS_PROVIDER
  );
  const wallet = ethers.Wallet.fromMnemonic(process.env.WALLET_MNEMONIC);
  const account = wallet.connect(provider);

  const router = new ethers.Contract(
    ROUTER,
    [
      "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
      "function swapExactTokensForTokens( uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)",
    ],
    account
  );

  return router;
}
