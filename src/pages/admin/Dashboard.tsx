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

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const AdminDashboard = () => {
  const tokenLogs = [
    { id: "사용자 #1234", desc: "레벨업 보상", amount: "+15 MZTK" },
    { id: "사용자 #5678", desc: "레벨업 보상", amount: "+15 MZTK" },
    { id: "사용자 #1234", desc: "레벨업 보상", amount: "+15 MZTK" },
    { id: "사용자 #5678", desc: "레벨업 보상", amount: "+15 MZTK" },
    { id: "사용자 #1234", desc: "레벨업 보상", amount: "+15 MZTK" },
    { id: "사용자 #5678", desc: "레벨업 보상", amount: "+15 MZTK" },
  ];

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
        font: {
          weight: "bold" as const,
          size: 18,
        },
        formatter: (value: number) => {
          return value + "%";
        },
        anchor: "center" as const,
        align: "center" as const,
      },
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += context.parsed + "%";
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="서버 상태"
          value="온라인"
          subValue="● 정상 운영 중"
          iconBg="bg-main"
          icon="/icon/server.svg"
        />
        <SummaryCard
          title="ETH 잔액"
          value="24.5 ETH"
          iconBg="bg-blue-100"
          icon="/icon/ether.svg"
        />
        <SummaryCard
          title="MZTK 잔액"
          value="1,250,000"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex font-bold text-gray-800">토큰 지급 기록</div>
            <CommonButton
              label="전체 보기"
              img="/icon/eye.svg"
              width="w-fit"
              className="text-xs px-3 py-1 bg-main text-white rounded-full font-bold hover:bg-sub"
            />
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {" "}
            {tokenLogs.map((log, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-bold text-sm text-gray-800">{log.id}</p>
                  <p className="text-xs text-gray-500">{log.desc}</p>
                </div>
                <span className="text-orange-500 font-bold text-sm">
                  {log.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col">
          <h4 className="font-bold text-gray-800 mb-6">게시물 삭제 통계</h4>
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="relative w-full max-w-[400px] h-[300px]">
              {" "}
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
