import { Card } from "@/components/ui/card";
import { 
  MessageSquare, 
  Users, 
  Clock,
  ThumbsUp
} from "lucide-react";

const stats = [
  {
    name: "Total Conversations",
    value: "1,234",
    change: "+12%",
    icon: MessageSquare
  },
  {
    name: "Response Time",
    value: "1.2m",
    change: "-20%",
    icon: Clock
  },
  {
    name: "Active Users",
    value: "892",
    change: "+5%",
    icon: Users
  },
  {
    name: "Satisfaction Rate",
    value: "98%",
    change: "+2%",
    icon: ThumbsUp
  }
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.change.startsWith("+");
        
        return (
          <Card key={stat.name} className="p-6">
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
