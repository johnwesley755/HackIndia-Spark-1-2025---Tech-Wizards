import { motion } from "framer-motion";
import StatCards from "@/components/dashboard/StatCards";
import ActivityChart from "@/components/dashboard/ActivityChart";
import TopPerformingAgents from "@/components/dashboard/TopPerformingAgents";
import SystemHealth from "@/components/dashboard/SystemHealth";
import DashboardTrends from "@/components/dashboard/DashboardTrends";

export default function Dashboard() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your AI support platform
        </p>
      </div>

      <StatCards />
      <ActivityChart />
      <TopPerformingAgents />
      <SystemHealth />
      <DashboardTrends />
    </motion.div>
  );
}
