import dotenv from "dotenv";
dotenv.config();

import { configRouter } from "./router.js";

import _ethers from "ethers";
const ethers = _ethers;

export async function buy(_payToken, _buyToken) {
  var payToken = _payToken;
  var buyToken = _buyToken;

  if (
    payToken === null ||
    payToken === "" ||
    buyToken === null ||
    buyToken === ""
  ) {
    return;
  }

  var me = process.env.MY_WALLET;
  var router = await configRouter();

  const amountIn = ethers.utils.parseUnits(process.env.WBNB_AMOUNT, "ether"); //ether is the measurement, not the coin

  var amounts = null;
  var amountsError = false;
  amounts = await router
    .getAmountsOut(amountIn, [payToken, buyToken])
    .catch(() => {
      amountsError = true;
    });
  if (amountsError === true) {
    return "buyer buy failed";
  }

  var buyStatus = 0;
  const amountOutMin = amounts[1].sub(amounts[1].div(10));
  const buyTx = await router.swapExactTokensForTokens(
    amountIn,
    amountOutMin,
    [payToken, buyToken],
    me,
    Date.now() + 1000 * 30 //buy deadline 0.5 minute
  );

  let buyReceipt = null;
  await buyTx
    .wait()
    .then(function (receipt) {
      buyReceipt = receipt;
    })
    .catch((err) => {
      console.error(err);
    });

  if (buyReceipt === null) {
    return "buyer buy failed";
  }
  buyStatus = await buyReceipt.status;

  if (buyStatus != 1) {
    return "buyer buy failed";
  }
  return "buyer script success";
}
