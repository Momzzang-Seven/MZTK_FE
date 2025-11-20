import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { VOUCHER_ABI } from "@abi";
import { voucherCodeToBytes32, parseAmount } from "@utils/voucher";

export const useVoucher = (voucherAddress: string) => {
  const [account, setAccount] = useState<string>();
  const [voucherContract, setVoucherContract] = useState<ethers.Contract>();
  const [tokenBalance, setTokenBalance] = useState<string>("0");

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) {
        alert("MetaMask를 설치해주세요!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);

      const voucher = new ethers.Contract(voucherAddress, VOUCHER_ABI, signer);
      setVoucherContract(voucher);

      const tokenAddress = await voucher.rewardToken();
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ["function balanceOf(address) view returns (uint256)"],
        signer
      );
      const balance = await tokenContract.balanceOf(voucherAddress);
      setTokenBalance(ethers.formatUnits(balance, 18));
    };

    init();
  }, [voucherAddress]);

  const issueVoucher = async (code: string, amount: string) => {
    if (!voucherContract || !code) return;

    try {
      const tx = await voucherContract.issueVoucher(
        voucherCodeToBytes32(code),
        parseAmount(amount)
      );
      await tx.wait();
      alert("Voucher issued!");
    } catch (err: unknown) {
      if (err instanceof Error) alert("Issue failed: " + err.message);
      else alert("Issue failed: Unknown error");
    }
  };

  const redeemVoucher = async (code: string) => {
    if (!voucherContract || !code) return;

    try {
      const tx = await voucherContract.redeemVoucher(
        voucherCodeToBytes32(code)
      );
      await tx.wait();
      alert("Voucher redeemed!");
    } catch (err: unknown) {
      if (err instanceof Error) alert("Redeem failed: " + err.message);
      else alert("Redeem failed: Unknown error");
    }
  };

  return { account, tokenBalance, issueVoucher, redeemVoucher };
};
