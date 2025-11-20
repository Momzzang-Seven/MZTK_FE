import { useEffect, useState } from "react";
import { ethers, toUtf8Bytes, hexlify } from "ethers";
import { VOUCHER_ABI } from "@abi";
import { PostIssueChallenge, PostVerifyChallenge } from "@services/auth";
import axios from "axios";

const VoucherTest = () => {
  const [account, setAccount] = useState<string>();
  const [voucherContract, setVoucherContract] = useState<ethers.Contract>();
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [redeemCode, setRedeemCode] = useState<string>("");
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [challenge, setChallenge] = useState<string>("");

  const VOUCHER_ADDRESS = import.meta.env.VITE_VOUCHER_ADDRESS;

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

      const voucher = new ethers.Contract(VOUCHER_ADDRESS, VOUCHER_ABI, signer);
      setVoucherContract(voucher);

      const tokenAddress = await voucher.rewardToken();
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ["function balanceOf(address) view returns (uint256)"],
        signer
      );
      const balance = await tokenContract.balanceOf(VOUCHER_ADDRESS);
      setTokenBalance(ethers.formatUnits(balance, 18));
    };

    init();
  }, [VOUCHER_ADDRESS]);

  const issueVoucher = async () => {
    if (!voucherContract || !voucherCode) return;

    const codeBytes = toUtf8Bytes(voucherCode);
    const padded = new Uint8Array(32);
    padded.set(codeBytes);
    const codeBytes32 = hexlify(padded);

    const amount = ethers.parseUnits("1", 18);

    try {
      const tx = await voucherContract.issueVoucher(codeBytes32, amount);
      await tx.wait();
      alert("Voucher issued!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Issue failed: " + err.message);
      } else {
        alert("Issue failed: Unknown error");
      }
    }
  };

  const redeemVoucher = async () => {
    if (!voucherContract || !redeemCode) return;

    const codeBytes = toUtf8Bytes(redeemCode);
    const padded = new Uint8Array(32);
    padded.set(codeBytes);
    const codeBytes32 = hexlify(padded);

    try {
      const tx = await voucherContract.redeemVoucher(codeBytes32);
      await tx.wait();
      alert("Voucher redeemed!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Issue failed: " + err.message);
      } else {
        alert("Issue failed: Unknown error");
      }
    }
  };

  const issueChallenge = async (addr: string) => {
    const challengeMsg = await PostIssueChallenge(addr);

    const domain = {
      name: "VoucherLogin",
      version: "1",
      chainId: 11155111,
      verifyingContract: VOUCHER_ADDRESS,
    };

    const types = {
      Login: [{ name: "message", type: "string" }],
    };

    const messageObj = {
      message: challengeMsg,
    };

    const typedData = JSON.stringify({
      domain,
      types,
      primaryType: "Login",
      message: messageObj,
    });

    const signature = await window.ethereum.request({
      method: "eth_signTypedData_v4",
      params: [addr, typedData],
    });

    setChallenge(signature);
  };

  const verifyChallenge = async (addr: string, challenge: string) => {
    try {
      const res = await PostVerifyChallenge(addr, challenge);
      setChallenge(res);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          alert(
            "Login failed: Unauthorized. Please check your wallet or signature."
          );
        } else {
          alert(`Login failed: ${err.response?.statusText}`);
        }
      } else if (err instanceof Error) {
        alert("Login failed: " + err.message);
      } else {
        alert("Login failed: Unknown error");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Voucher Dashboard</h2>
      <button
        type="button"
        className="bg-main p-2"
        onClick={() => issueChallenge(account ?? "")}
        disabled={!account}
      >
        Issue Challenge
      </button>
      <button
        type="button"
        className="bg-main p-2"
        onClick={() => verifyChallenge(account ?? "", challenge ?? "")}
        disabled={!account || !challenge}
      >
        Verify Challenge
      </button>
      <p>Connected account: {account}</p>
      <p>Voucher contract token balance: {tokenBalance}</p>

      <div className="mt-4">
        <h3 className="font-semibold">Issue Voucher</h3>
        <input
          type="text"
          placeholder="Enter voucher code"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          className="border p-1 mr-2"
        />
        <button
          onClick={issueVoucher}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Issue 1 Token
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Redeem Voucher</h3>
        <input
          type="text"
          placeholder="Enter voucher code"
          value={redeemCode}
          onChange={(e) => setRedeemCode(e.target.value)}
          className="border p-1 mr-2"
        />
        <button
          onClick={redeemVoucher}
          className="bg-green-500 text-white p-2 rounded"
        >
          Redeem
        </button>
      </div>
    </div>
  );
};

export default VoucherTest;
