import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { date: "Mon", conversations: 65 },
  { date: "Tue", conversations: 59 },
  { date: "Wed", conversations: 80 },
  { date: "Thu", conversations: 81 },
  { date: "Fri", conversations: 56 },
  { date: "Sat", conversations: 40 },
  { date: "Sun", conversations: 45 }
];

export default function ActivityChart() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-6">Weekly Activity</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="conversations" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
