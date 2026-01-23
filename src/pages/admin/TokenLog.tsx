import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

interface TokenLogItem {
  id: string;
  desc: string;
  value: string;
  to: string;
}

const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;
const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS;

const TokenLog = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<TokenLogItem[]>([]);

  useEffect(() => {
    fetch(
      `https://api.etherscan.io/v2/api?chainid=11155111&module=account&action=tokentx&contractaddress=${TOKEN_ADDRESS}&page=1&offset=20&sort=desc&apikey=${ETHERSCAN_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "1") setLogs(data.result);
      });
  }, []);

  return (
    <div className="p-10">
      <div className="flex items-center gap-4 mb-8 items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl text-black hover:text-main transition-colors"
        >
          ←
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          대시보드로 돌아가기
        </h2>
      </div>
      <div className="bg-white rounded-[40px] border border-gray-100 p-10 space-y-4">
        {logs.map((tx, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-6 bg-gray-50 rounded-[24px]"
          >
            <div>
              <p className="font-bold text-gray-800">사용자 #{tx.to}</p>
              <p className="text-sm text-gray-400">레벨업 보상</p>
            </div>
            <span className="text-orange-400 font-bold text-xl">
              +{Number(ethers.formatUnits(tx.value, 18)).toLocaleString()} MZTK
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenLog;
