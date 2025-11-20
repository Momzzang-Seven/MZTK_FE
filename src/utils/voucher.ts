import { toUtf8Bytes, hexlify, ethers } from "ethers";

export const voucherCodeToBytes32 = (code: string): string => {
  const codeBytes = toUtf8Bytes(code);
  const padded = new Uint8Array(32);
  padded.set(codeBytes);
  return hexlify(padded);
};

export const parseAmount = (amount: string, decimals = 18) =>
  ethers.parseUnits(amount, decimals);
