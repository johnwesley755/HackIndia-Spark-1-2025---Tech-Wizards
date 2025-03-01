import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Line } from "react-chartjs-2";
import { reportsData, summaryData } from "@/lib/mock-data";
import { FiDownloadCloud } from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Summary Card Component
const SummaryCard = ({
  title,
  value,
  change,
  type,
}: {
  title: string;
  value: string;
  change: string;
  type: "positive" | "negative";
}) => {
  return (
    <Card className="p-6 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <Badge
        className={
          type === "positive"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }
      >
        {change}
      </Badge>
    </Card>
  );
};

// Report Table Component
const ReportTable = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Report Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.map((report) => (
              <tr key={report.id} className="border-t">
                <td className="p-2">{report.name}</td>
                <td className="p-2">{report.date}</td>
                <td className="p-2">
                  <Badge
                    className={
                      report.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {report.status}
                  </Badge>
                </td>
                <td className="p-2">
                  <Button size="sm" variant="outline">
                    <FiDownloadCloud className="mr-2" /> Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

// Chart Component
const ReportsChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [5000, 8000, 12000, 15000, 18000, 21000],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
      <Line data={data} />
    </Card>
  );
};

// Main Reports Page
export default function Reports() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">View and manage all reports.</p>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryData.map((item) => (
          <SummaryCard key={item.title} {...item} />
        ))}
      </div>

      {/* Chart Section */}
      <ReportsChart />

      {/* Report Table */}
      <ReportTable />
    </motion.div>
  );
}
