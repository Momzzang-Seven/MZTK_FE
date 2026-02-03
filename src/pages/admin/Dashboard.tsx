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
import { useNavigate } from "react-router-dom";

import { useAdminDashboardData } from "@hooks";
import { getChartData, getChartOptions } from "@utils";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface TokenLogItem {
  id: string;
  desc: string;
  amount: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { tokenLogs, ethBalance, mztkBalance, loading } =
    useAdminDashboardData();
  const chartData = getChartData();
  const chartOptions = getChartOptions();

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
        <TokenLogsSection
          tokenLogs={tokenLogs}
          loading={loading}
          onViewAll={() => navigate("/admin/token-logs")}
        />
        <ReportStatsSection chartData={chartData} chartOptions={chartOptions} />
      </div>
    </div>
  );
};

interface TokenLogsSectionProps {
  tokenLogs: TokenLogItem[];
  loading: boolean;
  onViewAll: () => void;
}

const TokenLogsSection = ({
  tokenLogs,
  loading,
  onViewAll,
}: TokenLogsSectionProps) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100">
    <div className="flex justify-between items-center mb-6">
      <h4 className="font-bold text-gray-800">토큰 지급 기록</h4>
      <CommonButton
        label="전체 보기"
        img="/icon/eye.svg"
        width="w-fit"
        className="text-xs px-3 py-1 bg-main text-white rounded-full font-bold hover:bg-sub"
        onClick={onViewAll}
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
            <span className="text-main font-bold text-sm">{log.amount}</span>
          </div>
        ))
      ) : (
        <div className="text-center py-20 text-gray-400">기록이 없습니다.</div>
      )}
    </div>
  </div>
);

interface ReportStatsSectionProps {
  chartData: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      hoverOffset: number;
      borderWidth: number;
    }[];
  };
  chartOptions: {
    responsive: boolean;
    maintainAspectRatio: boolean;
    plugins: {
      datalabels: {
        color: string;
        font: { weight: "bold"; size: number };
        formatter: (value: number) => string;
        anchor: "center";
        align: "center";
      };
      legend: {
        position: "right";
        labels: { boxWidth: number; padding: number };
      };
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"pie">) => string;
        };
      };
    };
  };
}

const ReportStatsSection = ({
  chartData,
  chartOptions,
}: ReportStatsSectionProps) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col">
    <h4 className="font-bold text-gray-800 mb-6">게시물 삭제 통계</h4>
    <div className="flex-1 w-full flex items-center justify-center">
      <div className="relative w-full max-w-[400px] h-[300px]">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  </div>
);

export default AdminDashboard;
