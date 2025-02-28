import { Card } from "@/components/ui/card";
import { 
  MessageSquare, 
  Users, 
  Clock,
  ThumbsUp
} from "lucide-react";
import { generateStats } from "@/lib/mock-data";
import { useState, useEffect } from "react";

export default function StatCards() {
  const [stats, setStats] = useState(generateStats());

  // Regenerate stats every 30 seconds to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(generateStats());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      name: "Total Conversations",
      value: stats.totalConversations.toLocaleString(),
      change: "+12%",
      icon: MessageSquare
    },
    {
      name: "Avg Response Time",
      value: `${stats.responseTime}m`,
      change: "-20%",
      icon: Clock
    },
    {
      name: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      change: "+5%",
      icon: Users
    },
    {
      name: "Satisfaction Rate",
      value: `${stats.satisfactionRate}%`,
      change: "+2%",
      icon: ThumbsUp
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.change.startsWith("+");

        return (
          <Card key={stat.name} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.name}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-semibold">
                    {stat.value}
                  </p>
                  <span className={`text-sm ${
                    isPositive ? "text-green-500" : "text-red-500"
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}