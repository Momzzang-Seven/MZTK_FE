import { type TooltipItem } from "chart.js";

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
    borderWidth: number;
  }[];
}

interface ChartOptions {
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
}

export const getChartData = (): ChartData => ({
  labels: ["부적절한 내용", "스팸", "규정 위반", "괴롭힘", "기타"],
  datasets: [
    {
      data: [30, 25, 20, 15, 10],
      backgroundColor: ["#FF6384", "#FF9F40", "#4BC0C0", "#9966FF", "#FFCD56"],
      hoverOffset: 4,
      borderWidth: 0,
    },
  ],
});

export const getChartOptions = (): ChartOptions => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      color: "#fff",
      font: { weight: "bold" as const, size: 18 },
      formatter: (value: number) => `${value}%`,
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
          if (context.parsed !== null) label += `${context.parsed}%`;
          return label;
        },
      },
    },
  },
});
