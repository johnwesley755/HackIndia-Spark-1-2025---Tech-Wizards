import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { generateWeeklyActivity } from "@/lib/mock-data";

// Register required Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default function DashboardTrends() {
  const [weeklyActivity, setWeeklyActivity] = useState(() =>
    generateWeeklyActivity()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWeeklyActivity(generateWeeklyActivity());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: weeklyActivity.map((day) => day.date),
    datasets: [
      {
        label: "Conversations",
        data: weeklyActivity.map((day) => day.conversations),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as "top", // ✅ Explicitly typing `position`
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">User Engagement Trends</h3>
      <div className="h-72">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
}
