import { Pie } from "react-chartjs-2";
import { type TooltipItem } from "chart.js";

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

export default ReportStatsSection;
