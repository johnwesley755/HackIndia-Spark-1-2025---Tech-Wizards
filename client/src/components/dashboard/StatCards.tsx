import { Card } from "@/components/ui/card";
import {
  MessageSquare,
  Users,
  Clock,
  ThumbsUp,
  UserPlus,
  Send,
  TrendingUp,
  Activity,
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
      icon: MessageSquare,
      trend: "up",
    },
    {
      name: "Avg Response Time",
      value: `${stats.responseTime}m`,
      change: "-20%",
      icon: Clock,
      trend: "down",
    },
    {
      name: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      change: "+5%",
      icon: Users,
      trend: "up",
    },
    {
      name: "Satisfaction Rate",
      value: `${stats.satisfactionRate}%`,
      change: "+2%",
      icon: ThumbsUp,
      trend: "up",
    },
    {
      name: "New Users",
      value: stats.newUsers.toLocaleString(),
      change: "+15%",
      icon: UserPlus,
      trend: "up",
    },
    {
      name: "Messages Sent",
      value: stats.messagesSent.toLocaleString(),
      change: "+8%",
      icon: Send,
      trend: "up",
    },
    {
      name: "Retention Rate",
      value: `${stats.retentionRate}%`,
      change: "-3%",
      icon: TrendingUp,
      trend: "down",
    },
    {
      name: "Peak Traffic",
      value: `${stats.peakTraffic} users`,
      change: "+10%",
      icon: Activity,
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.change.startsWith("+");

        return (
          <Card
            key={stat.name}
            className="p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              {/* Icon Section */}
              <div
                className={`p-2 rounded-lg ${
                  isPositive ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <Icon
                  className={`h-6 w-6 ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                />
              </div>

              {/* Stats Information */}
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <span
                    className={`text-sm flex items-center gap-1 ${
                      isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                    {isPositive ? "▲" : "▼"}
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
