import { useEffect, useState } from "react";
import { Server, Database, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { fetchSystemHealth } from "@/lib/mock-data";

export default function SystemHealth() {
  const [health, setHealth] = useState(fetchSystemHealth());

  useEffect(() => {
    const interval = setInterval(() => {
      setHealth(fetchSystemHealth());
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">System Health</h3>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center gap-4">
          <Server className="h-5 w-5 text-primary" />
          <span className="flex-1">API Server</span>
          {health.api ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>

        <div className="flex items-center gap-4">
          <Database className="h-5 w-5 text-primary" />
          <span className="flex-1">Database</span>
          {health.database ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
      </div>
    </Card>
  );
}
