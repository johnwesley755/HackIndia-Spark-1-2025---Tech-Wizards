import { useEffect, useState } from "react";
import { Star, Clock, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { generateTopAgents } from "@/lib/mock-data";

export default function TopPerformingAgents() {
  const [agents, setAgents] = useState(generateTopAgents());

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(generateTopAgents());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Top Performing Agents</h3>
      <ul className="space-y-4">
        {agents.map((agent) => (
          <li key={agent.id} className="flex items-center gap-4">
            <User className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">{agent.name}</p>
              <p className="text-xs text-gray-400">{agent.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-semibold">{agent.rating}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{agent.responseTime} min</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
