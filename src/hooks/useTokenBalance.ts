import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { MZTK_ABI } from "@abi";

const ERC20_ABI = MZTK_ABI[0];

export const useTokenBalance = () => {
  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState(true);

  const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS;
  const USER_ADDRESS = localStorage.getItem("wallet_address");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!USER_ADDRESS) {
        setLoading(false);
        return;
      }

      try {
        const provider = new ethers.JsonRpcProvider(
          import.meta.env.VITE_RPC_URL
        );
        const contract = new ethers.Contract(
          TOKEN_ADDRESS,
          ERC20_ABI,
          provider
        );

        const rawBalance = await contract.balanceOf(USER_ADDRESS);
        const decimals = await contract.decimals();
        const formattedBalance = ethers.formatUnits(rawBalance, decimals);

        setBalance(formattedBalance);
      } catch (error) {
        console.error("잔액 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [USER_ADDRESS, TOKEN_ADDRESS]);

  return { balance, loading, USER_ADDRESS };
};
