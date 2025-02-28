import { motion } from "framer-motion";
import StatCards from "@/components/dashboard/StatCards";
import ActivityChart from "@/components/dashboard/ActivityChart";

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
    </motion.div>
  );
}
