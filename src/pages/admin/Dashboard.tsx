import SummaryCard from "@components/admin/Dashboard/SummaryCard";
import { CommonButton } from "@components/common";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type TooltipItem,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

interface EtherscanTxItem {
  from: string;
  to: string;
  value: string;
  tokenName?: string;
  tokenSymbol?: string;
  timeStamp?: string;
  hash?: string;
}

interface TokenLogItem {
  id: string;
  desc: string;
  amount: string;
}

const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;
const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS;
const ADMIN_WALLET_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS;
const ETHERSCAN_API_URL = import.meta.env.VITE_ETHERSCAN_API_URL;

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tokenLogs, setTokenLogs] = useState<TokenLogItem[]>([]);
  const [ethBalance, setEthBalance] = useState<string>("0");
  const [mztkBalance, setMztkBalance] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const tokenTxUrl = `${ETHERSCAN_API_URL}?module=account&action=tokentx&contractaddress=${TOKEN_ADDRESS}&page=1&offset=6&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
        const ethBalanceUrl = `${ETHERSCAN_API_URL}?module=account&action=balance&address=${ADMIN_WALLET_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`;
        const mztkBalanceUrl = `${ETHERSCAN_API_URL}?module=account&action=tokenbalance&contractaddress=${TOKEN_ADDRESS}&address=${ADMIN_WALLET_ADDRESS}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;

        const [txRes, ethRes, mztkRes] = await Promise.all([
          fetch(tokenTxUrl),
          fetch(ethBalanceUrl),
          fetch(mztkBalanceUrl),
        ]);

        const txData = await txRes.json();
        const ethData = await ethRes.json();
        const mztkData = await mztkRes.json();

        console.log("TX Data:", txData);
        console.log("ETH Data:", ethData);
        console.log("MZTK Data:", mztkData);

        if (txData.status === "1" && Array.isArray(txData.result)) {
          const formattedLogs: TokenLogItem[] = txData.result.map(
            (tx: EtherscanTxItem) => ({
              id: `사용자 #${tx.to.slice(0, 6)}...${tx.to.slice(-4)}`,
              desc:
                tx.from === "0x0000000000000000000000000000000000000000"
                  ? "토큰 발행(Mint)"
                  : "토큰 전송",
              amount: `+${Number(ethers.formatUnits(tx.value, 18)).toLocaleString()} MZTK`,
            })
          );
          setTokenLogs(formattedLogs);
        }

        if (ethData.status === "1") {
          const formattedEth = ethers.formatEther(ethData.result);
          setEthBalance(
            Number(formattedEth).toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })
          );
        }

        if (mztkData.status === "1") {
          const formattedMztk = ethers.formatUnits(mztkData.result, 18);
          setMztkBalance(Number(formattedMztk).toLocaleString());
        }
      } catch (error) {
        console.error("데이터 호출 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const chartData = {
    labels: ["부적절한 내용", "스팸", "규정 위반", "괴롭힘", "기타"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          "#FF6384",
          "#FF9F40",
          "#4BC0C0",
          "#9966FF",
          "#FFCD56",
        ],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: "#fff",
        font: { weight: "bold" as const, size: 18 },
        formatter: (value: number) => value + "%",
        anchor: "center" as const,
        align: "center" as const,
      },
      legend: {
        position: "right" as const,
        labels: { boxWidth: 20, padding: 15 },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            let label = context.label || "";
            if (label) label += ": ";
            if (context.parsed !== null) label += context.parsed + "%";
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <SummaryCard
          title="서버 상태"
          value="온라인"
          subValue="● 정상 운영 중"
          iconBg="bg-main"
          icon="/icon/server.svg"
        />
        <SummaryCard
          title="ETH 잔액"
          value={loading ? "로딩 중..." : `${ethBalance} ETH`}
          iconBg="bg-blue-600"
          icon="/icon/ether.svg"
        />
        <SummaryCard
          title="MZTK 잔액"
          value={loading ? "로딩 중..." : `${mztkBalance} MZTK`}
          iconBg="bg-main"
          icon="/icon/token.svg"
        />
        <SummaryCard
          title="활성 사용자"
          value="1,847"
          subValue="BAN 사용자: 23명"
          iconBg="bg-blue-600"
          icon="/icon/activeUser.svg"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800">토큰 지급 기록</h4>
            <CommonButton
              label="전체 보기"
              img="/icon/eye.svg"
              width="w-fit"
              className="text-xs px-3 py-1 bg-main text-white rounded-full font-bold hover:bg-sub"
              onClick={() => navigate("/admin/token-logs")}
            />
          </div>
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
            {loading ? (
              <div className="flex justify-center items-center py-20 text-gray-400">
                데이터 로딩 중...
              </div>
            ) : tokenLogs.length > 0 ? (
              tokenLogs.map((log, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-xl animate-fadeIn"
                >
                  <div>
                    <p className="font-bold text-sm text-gray-800">{log.id}</p>
                    <p className="text-xs text-gray-500">{log.desc}</p>
                  </div>
                  <span className="text-main font-bold text-sm">
                    {log.amount}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-400">
                기록이 없습니다.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col">
          <h4 className="font-bold text-gray-800 mb-6">게시물 삭제 통계</h4>
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="relative w-full max-w-[400px] h-[300px]">
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
